# Media Recorder

This project provides simple audio and video recording components for a web application using React and TypeScript. It leverages the MediaRecorder API to capture audio and video streams from the user's device, enabling functionalities for recording, playback, and download.

## Features

- **Audio Recorder**: 
  - Request microphone permissions
  - Start and stop audio recording
  - Play recorded audio
  - Download each audio recording as a file
  - Stores multiple audio recordings, allowing you to replay each recording separately

- **Video Recorder**:
  - Request camera and microphone permissions
  - Start and stop video recording with audio
  - Live video feed during recording
  - Play each recorded video
  - Download each video recording as a file
  - Stores multiple video recordings, allowing you to replay each recording separately

## Getting Started

To use this project, follow the instructions below.

### Prerequisites

- Node.js
- A web browser that supports the MediaRecorder API (most modern browsers, such as Chrome, Firefox, Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/awakeneddev/media_recorder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd media-recorder
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Usage

To run the project:

```bash
pnpm run dev
```

Navigate to `http://localhost:3000` in your browser. You should see options for both **Audio Recorder** and **Video Recorder**.

### Audio Recorder Component

The Audio Recorder component enables users to record audio, play back each recording, and download recordings for offline use. Here’s how to use it:

1. Click **Get Microphone** to allow microphone access.
2. Once permission is granted, click **Start Recording** to begin recording audio.
3. Click **Stop Recording** to end the recording.
4. Each recording will appear as a playable audio clip with an option to download.

#### Code Summary

The `AudioRecorder` component uses the `MediaRecorder` API to record audio. Each recorded audio is stored in an array, and a new audio element is created for each recording.

### Video Recorder Component

The Video Recorder component enables users to record video with audio, play back each recording, and download recordings for offline use. Here’s how to use it:

1. Click **Get Camera** to allow access to your camera and microphone.
2. Once permission is granted, click **Start Recording** to begin recording video.
3. Click **Stop Recording** to end the recording.
4. Each recording will appear as a playable video clip with an option to download.

#### Code Summary

The `VideoRecorder` component uses the `MediaRecorder` API to capture both video and audio streams. Each recorded video is stored in an array, and a new video element is created for each recording.

### Example Code

#### Audio Recorder

```tsx
import { AudioRecorder } from './components/AudioRecorder';

function App() {
  return <AudioRecorder />;
}

export default App;
```

#### Video Recorder

```tsx
import { VideoRecorder } from './components/VideoRecorder';

function App() {
  return <VideoRecorder />;
}

export default App;
```

### Limitations

- The **MediaRecorder API** requires secure contexts (HTTPS), so this project must be served over HTTPS in production.
- Some older browsers may not support the **MediaRecorder API**.

## Acknowledgments

- The MediaRecorder API documentation on [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) was instrumental in the creation of this project.
- Inspired by open-source audio and video recording solutions.
```

This `README.md` file provides a comprehensive overview of the media recorder functionality, setup instructions, usage guide, and limitations. Feel free to modify the repository link and add any additional project-specific details.