import ScoreBoard from "./components/ScoreBoard";
import "./App.css";
import Minefield from "./components/Minefield.js";
import { MovesContextProvider } from "./store/MovesContext.js";
import React from "react";

function App() {
  // TODO: Make maxFlags relate to table size/difficulty

  return (
    <div className="App">
      <MovesContextProvider>
        <ScoreBoard maxFlags={10} />
        <Minefield />
      </MovesContextProvider>
    </div>
  );
}

export default App;
