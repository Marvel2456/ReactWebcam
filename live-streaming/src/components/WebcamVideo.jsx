import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamVideo() {
  const webcamRef = useRef(null);

  const [streaming, setStreaming] = useState(false);

  

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
          {streaming ? (
            <button onClick={handleStopStreamClick}>Stop Streaming</button>
          ): (
            <button onClick={handleStartStreamClick}>Start Stream</button>
          )}
          
        </React.Fragment>
      )}
    </div>
  );
}
