import { useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const videoRef = useRef(null);

  //constraints tiene que tener al menos video o audio: true
  const [constraints, setConstraints] = useState({
    video: true,
    audio: true,
  });

  const toggleCamera = () => {
    setConstraints((current) => ({
      ...current,
      video: !current.video,
    }));
  };

  const toggleMic = () => {
    setConstraints((current) => ({
      ...current,
      audio: !current.audio,
    }));
  };

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        console.log("Se obtuvo el stream");
      } catch (err) {
        console.error("Error al obtener medios", err);
      }
    };

    getMediaStream();
  }, [constraints]);

  return (
    <>
      <div>
        <video ref={videoRef} autoPlay />
      </div>

      <div>
        <button onClick={toggleCamera}>
          Camara {constraints.video ? "ON" : "OFF"}
        </button>

        <button onClick={toggleMic}>
          Mic {constraints.audio ? "ON" : "OFF"}
        </button>
      </div>
    </>
  );
}

export default App;
