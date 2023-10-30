import { useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const videoRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(false);

  const constraints = {
    video: cameraOn,
    audio: micOn,
  };

  const toggleCamera = () => setCameraOn(!cameraOn);

  const toggleMic = () => setMicOn(!micOn);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error al obtener medios", err);
      });
  }, []);

  return (
    <>
      <div>
        <video ref={videoRef} autoPlay />
      </div>

      <div>
        <button onClick={toggleCamera}>Camara {cameraOn ? "ON" : "OFF"}</button>

        <button onClick={toggleMic}>Mic {micOn ? "ON" : "OFF"}</button>
      </div>
    </>
  );
}

export default App;
