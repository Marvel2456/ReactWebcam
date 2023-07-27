// import React, { useCallback, useRef, useState } from "react";
// import Webcam from "react-webcam";



// export default function WebcamVideo() {
//   const webcamRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
  
  
//   const handleStartStreamClick = useCallback(() => {
//     setStreaming(true);
    
    
//   }, []);

//   const handleStopStreamClick = useCallback(() => {
//     setStreaming(false);
    
//   }, []);

//   const videoConstraints = {
//     width: 420,
//     height: 420,
//     facingMode: "user",
//   };

//   return (
//     <div className="Container">
//       {!streaming ? (
//         <button onClick={handleStartStreamClick}>Start Stream</button>
//       ) : (
//         <React.Fragment>
//           <Webcam
//             height={400}
//             width={400}
//             audio={true}
//             mirrored={true}
//             ref={webcamRef}
//             videoConstraints={videoConstraints}
//           />
//           <button onClick={handleStopStreamClick}>Stop Stream</button>
//         </React.Fragment>
//       )}
//     </div>
//   );
// }

// import React, { useCallback, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import NodeMediaRecorder from "node-media-recorder";

// export default function WebcamVideo() {
//   const webcamRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [recorder, setRecorder] = useState(null);

//   const handleStartStreamClick = useCallback(() => {
//     if (!recorder) {
//       const nmsURL = "rtmp://your-custom-rtmp-server-ip/live/stream_name";
//       const nodeMediaRecorder = new NodeMediaRecorder({
//         video: {
//           width: 640,
//           height: 480,
//           frameRate: 30,
//         },
//         audio: true,
//         sampleRate: 44100,
//         channelCount: 2,
//         mimeType: "audio/webm;codecs=opus",
//       });

//       nodeMediaRecorder.on("data", (data) => {
//         console.log("Data received from Node Media Recorder:", data);
//       });

//       nodeMediaRecorder.on("stop", () => {
//         console.log("Node Media Recorder stopped.");
//       });

//       nodeMediaRecorder.on("start", () => {
//         console.log("Node Media Recorder started.");
//       });

//       setRecorder(nodeMediaRecorder);
//     }

//     setStreaming(true);
//   }, [recorder]);

//   const handleStopStreamClick = useCallback(() => {
//     if (recorder) {
//       recorder.stop();
//       setRecorder(null);
//     }

//     setStreaming(false);
//   }, [recorder]);

//   const videoConstraints = {
//     width: 420,
//     height: 420,
//     facingMode: "user",
//   };

//   return (
//     <div className="Container">
//       {!streaming ? (
//         <button onClick={handleStartStreamClick}>Start Stream</button>
//       ) : (
//         <React.Fragment>
//           <Webcam
//             height={400}
//             width={400}
//             audio={true}
//             mirrored={true}
//             ref={webcamRef}
//             videoConstraints={videoConstraints}
//           />
//           <button onClick={handleStopStreamClick}>Stop Stream</button>
//         </React.Fragment>
//       )}
//     </div>
//   );
// }


// import React, { useCallback, useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";

// export default function WebcamVideo() {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);
//   const [isWebcamAvailable, setIsWebcamAvailable] = useState(false);

//   useEffect(() => {
//     setIsWebcamAvailable(webcamRef.current !== null);
//   }, []);

//   const handleStartStreamClick = useCallback(async () => {
//     if (webcamRef.current === null) {
//       console.error("Webcam is not available");
//       return;
//     }
//     console.log("webcamRef.current:", webcamRef.current);
//     const stream = webcamRef.current.video.srcObject;
//     const options = { mimeType: "video/webm" };

//     try {
//       const mediaRecorder = new MediaRecorder(stream, options);
//       const chunks = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const videoBlob = new Blob(chunks, { type: "video/webm" });
        
//         const rtmpURL = "rtmp://172.17.0.2:1935/live/my_stream";
//         const formData = new FormData();
//         formData.append("file", videoBlob, "stream.webm");

//         try {
//           await fetch(rtmpURL, {
//             method: "POST",
//             body: formData,
//           });
//         } catch (error) {
//           console.error("Error sending video stream:", error);
//         }
//       };

//       mediaRecorderRef.current = mediaRecorder;
//       mediaRecorder.start();
//       setStreaming(true);
//     } catch (error) {
//       console.error("Error starting media recorder:", error);
//     }
//   }, []);

//   const handleStopStreamClick = useCallback(() => {
//     const mediaRecorder = mediaRecorderRef.current;
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setStreaming(false);
//     }
//   }, []);

//   const videoConstraints = {
//     width: 420,
//     height: 420,
//     facingMode: "user",
//   };

//   return (
//     <div className="Container">
//       {!isWebcamAvailable ? (
//         <p>Loading webcam...</p>
//       ) : !streaming ? (
//         <button onClick={handleStartStreamClick}>Start Stream</button>
//       ) : (
//         <React.Fragment>
//           <Webcam
//             height={400}
//             width={400}
//             audio={true}
//             mirrored={true}
//             ref={webcamRef}
//             videoConstraints={videoConstraints}
//           />
//           <button onClick={handleStopStreamClick}>Stop Stream</button>
//         </React.Fragment>
//       )}
//     </div>
//   );
// }

// import React, { useCallback, useRef, useState } from "react";
// import Webcam from "react-webcam";

// export default function WebcamVideo() {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [streaming, setStreaming] = useState(false);

//   const handleStartStreamClick = useCallback(async () => {
//     const stream = webcamRef.current.video.srcObject;
//     const options = { mimeType: "video/webm" };

//     try {
//       const mediaRecorder = new MediaRecorder(stream, options);
//       const chunks = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const videoBlob = new Blob(chunks, { type: "video/webm" });

//         // Set the streaming state to false, as the recording is complete
//         setStreaming(false);

//         // Send the entire video stream to the Docker container's RTMP server using the Fetch API
//         const rtmpURL = "rtmp://localhost:1935/live/stream_name";
//         const formData = new FormData();
//         formData.append("file", videoBlob, "stream.webm");

//         try {
//           await fetch(rtmpURL, {
//             method: "POST",
//             body: formData,
//           });
//         } catch (error) {
//           console.error("Error sending video stream:", error);
//         }
//       };

//       mediaRecorderRef.current = mediaRecorder;
//       mediaRecorder.start();
//       setStreaming(true);
//     } catch (error) {
//       console.error("Error starting media recorder:", error);
//     }
//   }, []);

//   const handleStopStreamClick = useCallback(() => {
//     const mediaRecorder = mediaRecorderRef.current;
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//   }, []);

//   const videoConstraints = {
//     width: 420,
//     height: 420,
//     facingMode: "user",
//   };

//   return (
//     <div className="Container">
//       {!streaming ? (
//         <button onClick={handleStartStreamClick}>Start Stream</button>
//       ) : (
//         <React.Fragment>
//           <Webcam
//             height={400}
//             width={400}
//             audio={true}
//             mirrored={true}
//             ref={webcamRef}
//             videoConstraints={videoConstraints}
//           />
//           <button onClick={handleStopStreamClick}>Stop Stream</button>
//         </React.Fragment>
//       )}
//     </div>
//   );
// }


import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamVideo() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const handleStartStreamClick = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const options = { mimeType: "video/webm; codecs=vp9" };

    try {
      const mediaRecorder = new MediaRecorder(stream, options);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" });

        setStreaming(false);

        const formData = new FormData();
        formData.append("file", videoBlob, "stream.webm");

        try {
          const response = await fetch("http://localhost:8080/publish", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            
            console.log("Stream was successfully posted to the server.");
          } else {
            console.error("Error posting the stream to the server.");
          }
        } catch (error) {
          // Handle fetch error
          console.error("Error sending video stream:", error);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setStreaming(true);
    } catch (error) {
      console.error("Error starting media recorder:", error);
    }
  }, []);

  const handleStopStreamClick = useCallback(() => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
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
