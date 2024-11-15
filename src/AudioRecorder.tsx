import { useRef, useState } from "react";

const mimeType = "audio/webm";

export const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<"inactive" | "recording">("inactive");
  const [recordedAudios, setRecordedAudios] = useState<string[]>([]); // Store multiple recordings

  // Function to get microphone permission
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
      alert("The MediaRecorder API is not supported in your browser");
    }
  };

  // Start recording audio
  const startRecording = () => {
    if (!stream) return;

    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(localAudioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordedAudios((prev) => [...prev, audioUrl]); // Add new audio to list
    };

    mediaRecorder.current.start();
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorder.current && recordingStatus === "recording") {
      setRecordingStatus("inactive");
      mediaRecorder.current.stop();
    }
  };

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
        </div>

        {/* List all recorded audio clips */}
        <div className="recorded-audios">
          {recordedAudios.map((audio, index) => (
            <div key={index} className="audio-container">
              <audio src={audio} controls></audio>
              <a download={`recording-${index + 1}.webm`} href={audio}>
                Download Recording {index + 1}
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
