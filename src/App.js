import "./App.css";
import Counter from "./Counter";

function App() {
  return (
    <div className="App">
      <div className="play-details">
        <Counter times={10} />
      </div>
    </div>
  );
}

export default App;
