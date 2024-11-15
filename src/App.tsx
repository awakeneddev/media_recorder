import { useState } from "react";
import "./App.css";
import { AudioRecorder } from "./AudioRecorder";
import { VideoRecorder } from "./VideoRecorder";

function App() {
  let [recordOption, setRecordOption] = useState("video");
  const toggleRecordOption = (type: string) => {
    return () => {
      setRecordOption(type);
    };
  };
  return (
    <div>
      <h1>React Media Recorder</h1>
      <div className="button-flex">
        <button
          onClick={toggleRecordOption("video")}
          style={{
            borderColor: `${recordOption === "video" ? "#646cff" : ""}`,
          }}
        >
          Record Video
        </button>
        <button
          onClick={toggleRecordOption("audio")}
          style={{
            borderColor: `${recordOption === "audio" ? "#646cff" : ""}`,
          }}
        >
          Record Audio
        </button>
      </div>
      <div>
        {recordOption === "video" ? <VideoRecorder /> : <AudioRecorder />}
      </div>
    </div>
  );
}

export default App;
