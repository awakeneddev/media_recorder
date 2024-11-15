import { useState, useRef } from "react";
const mimeType = "video/webm";
export const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const liveVideoFeed = useRef<HTMLVideoElement | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
  const [videoChunks, setVideoChunks] = useState<Blob[]>([]);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const getCameraPermission = async () => {
    setRecordedVideo(null);
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: true,
          video: true,
        };
        const audioConstraints = { audio: true };

        // Request separate audio and video streams
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        setPermission(true);

        //combine both audio and video streams
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        setStream(combinedStream);
        // Set the video stream to the live video feed player
        if (liveVideoFeed.current) {
          liveVideoFeed.current.srcObject = videoStream;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser");
    }
  };

  const startRecording = async () => {
    if (!stream) return; // Ensure the stream is available

    setRecordingStatus("recording");
    // Create a new MediaRecorder instance with the combined audio and video stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    // start recording video and audio
    mediaRecorder.current.start();

    // local array to store video
    let localVideoChunks: Blob[] = [];

    // event handler for data availability
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChunks.push(event.data);
    };

    // Update state with recorded video chunks
    setVideoChunks(localVideoChunks);
  };

  const stopRecording = () => {
    if (!mediaRecorder.current) return; // Ensure the mediaRecorder instance is available

    setPermission(false);
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();

    // On stopping, create a Blob from video chunks and set the video URL
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChunks([]); // Clear video chunks
    };
  };
  return (
    <div>
      <h2>Video Recorder</h2>
      <main>
        <div className="video-controls">
          {!permission ? (
            <button onClick={getCameraPermission} type="button">
              Get Camera
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
      </main>

      <div className="video-player">
        {!recordedVideo ? (
          <video ref={liveVideoFeed} autoPlay className="live-player"></video>
        ) : null}
        {recordedVideo ? (
          <div className="recorded-player">
            <video className="recorded" src={recordedVideo} controls></video>
            <a download href={recordedVideo}>
              Download Recording
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
};
