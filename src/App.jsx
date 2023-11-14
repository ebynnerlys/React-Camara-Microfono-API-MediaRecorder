import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  //Código para grabar vídeo usando MediaRecorder API (cámara y micrófono)
  const videoWebCamRef = useRef(null);

  //constraints tiene que tener al menos video o audio: true
  const [constraints, setConstraints] = useState({
    video: true,
    audio: true,
  });

  const toggleCamera = () => {
    // Solo se puede apagar la cámara si el audio está encendido
    if (constraints.audio || !constraints.video) {
      setConstraints((prevConstraints) => ({
        ...prevConstraints,
        video: !prevConstraints.video,
      }));
    } else {
      console.log("No se puede apagar la cámara si el micrófono está apagado");
    }
  };

  const toggleMic = () => {
    // Solo se puede apagar el micrófono si el video está encendido
    if (constraints.video || !constraints.audio) {
      setConstraints((prevConstraints) => ({
        ...prevConstraints,
        audio: !prevConstraints.audio,
      }));
    } else {
      console.log("No se puede apagar el micrófono si la cámara está apagada");
    }
  };

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoWebCamRef.current.srcObject = stream;
        console.log("Se obtuvo el stream");
      } catch (err) {
        console.error("Error al obtener medios", err);
      }
    };

    getMediaStream();
  }, [constraints]);

  return (
    <>
      <h3>Vídeo a tiempo real normal</h3>
      <div>
        <video ref={videoWebCamRef} autoPlay />
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
