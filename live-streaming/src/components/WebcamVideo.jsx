import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";



export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  
  const { NetConnection } = require('rtmp-client');

  const nc = new NetConnection();
  nc.onStatus = function (info) {
    if (info.code === 'NetConnection.Connect.Success') {
      nc.call('foo', {
        'onResult': console.log.bind(console),
        'onStatus': console.error.bind(console),
      }, 'bar');
    }
  };
  nc.rpcName = async function (...args) {
    console.log('server called rpcName', ...args);
  };
  nc.connect('rtmp://172.17.0.1:1935/live');


  const handleStartStreamClick = useCallback(() => {
    setStreaming(true);
    
    
  }, []);

  const handleStopStreamClick = useCallback(() => {
    setStreaming(false);
    
  }, []);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  return (
    <div className="Container">
      {!streaming ? (
        <button onClick={handleStartStreamClick}>Start Stream</button>
      ) : (
        <React.Fragment>
          <Webcam
            height={400}
            width={400}
            audio={true}
            mirrored={true}
            ref={webcamRef}
            videoConstraints={videoConstraints}
          />
          <button onClick={handleStopStreamClick}>Stop Stream</button>
        </React.Fragment>
      )}
    </div>
  );
}


// import React, { useEffect, useRef } from "react";
// import Webcam from "react-webcam";
// import flv from "flv.js";

// const WebcamStreamToRTMP = () => {
//   const webcamRef = useRef(null);
//   const videoRef = useRef(null);
//   let flvPlayer = null;

//   useEffect(() => {
//     const startStreaming = () => {
//       if (webcamRef.current) {
//         const webcam = webcamRef.current.video;
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // Initialize the FLV player
//         flvPlayer = flv.createPlayer({
//           type: "flv",
//           url: "rtmp://localhost:1935/live",
//         });
//         flvPlayer.attachMediaElement(videoRef.current);
//         flvPlayer.load();

//         const drawToCanvas = () => {
//           ctx.drawImage(webcam, 0, 0, webcam.width, webcam.height);
//           canvas.toBlob((blob) => sendToRTMP(blob));
//         };

//         const sendToRTMP = (blob) => {
//           if (flvPlayer && flvPlayer.isPlaying()) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               const arrayBuffer = reader.result;
//               flvPlayer.write({
//                 videoData: new Uint8Array(arrayBuffer),
//                 videoTimestamp: Date.now(),
//               });
//             };
//             reader.readAsArrayBuffer(blob);
//           }
//           requestAnimationFrame(drawToCanvas);
//         };

//         // Start drawing video to canvas and sending to RTMP
//         drawToCanvas();
//       }
//     };

//     startStreaming();
//   }, []);

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/webp"
//         videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
//       />
//       <video
//         ref={videoRef}
//         style={{ display: "none" }}
//         controls
//         width="640"
//         height="480"
//       />
//     </div>
//   );
// };

// export default WebcamStreamToRTMP;






