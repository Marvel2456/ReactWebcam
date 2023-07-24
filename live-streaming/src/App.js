import WebcamVideo from "./components/WebcamVideo";
import './App.css';

function App() {

  // const videoConstraints = {
  //   width: { min: 480 },
  //   height: { min: 720 },
  //   facingMode: "user",
  // };

  return (
    <div className="App">
      <WebcamVideo />
    </div>
  );
}

export default App;
