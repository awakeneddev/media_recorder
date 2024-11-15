import { useRef, useState } from "react";

const mimeType = "audio/webm";

export const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string | null>(null);

  // function to get micro[phone permission]
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err);
      }
    } else {
      alert("The mediaRecorder API is not supported in your browser");
    }
  };

  // function to start audio recordig
  const startRecording = async () => {
    if (!stream) return; // Ensure the stream is available
    setRecordingStatus("recording");

    // create new media recorder instance using the stream
    const media = new MediaRecorder(stream as MediaStream, { mimeType });
    // set the media recorder instance of the mediaRecorder ref
    mediaRecorder.current = media as MediaRecorder;

    // invokes the start method to start the recording process
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    // Event handler for data availability
    mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) {
        localAudioChunks.push(e.data);
      }
    };

    // Update state with audio chunks
    setAudioChunks(localAudioChunks);
  };
  const stopRecording = () => {
    if (!mediaRecorder.current) return; // Ensure the mediaRecorder instance is available

    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder?.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    };
  };

  console.log("audio : ", audioChunks);

  return (
    <div>
      <h2>Audio Recorder</h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
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

          {audio ? (
            <div className="audio-container">
              <audio src={audio} controls></audio>
              <a download href={audio}>
                Download Recording
              </a>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};
