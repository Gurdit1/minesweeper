import ScoreBoard from './components/ScoreBoard';
import './App.css';
import Minefield from './components/Minefield.js';
import { MovesContextProvider } from './store/MovesContext.js';

function App() {

  return (
    <div className="App">
      <MovesContextProvider>
        <ScoreBoard maxFlags={10}/>
        <Minefield/>
      </MovesContextProvider>
    </div>
  );
}

export default App;