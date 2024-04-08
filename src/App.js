// CSS
import './App.css';

// React
// useCallback --> 
import { useCallback, useEffect, useState } from "react";

// Data
import { wordList } from "./data/words";

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// Estágios do jogo
const stages = [
  { id:1, name: "start" },
  { id:2, name: "game" },
  { id:3, name: "end" },
]

function App() {   

  const [gameStage, setGameStage] = useState(stages[0].name);
  

  // Lista de palavras
  const [words] = useState(wordList);

  // Inicia o Jogo
  const startGame = () =>{
    setGameStage(stages[0].name);
    console.log("StartGame");
  }

  // Processa a letra digitada
  const verifyLetter = () =>{
    setGameStage(stages[1].name);
    console.log("Verify Letter");
  }

  // Termina Jogo
  const gameOver = () =>{
    setGameStage(stages[2].name);
    console.log("Game Over");
  }

  // Reseta o Jogo
  const retry = () =>{
    setGameStage(stages[0].name);    
  }

  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame = { verifyLetter } /> }
      { gameStage === "game" && <Game game = { gameOver }/> }
      { gameStage === "end" && <GameOver retry = { retry }/> } 
    </div>
  );
}

export default App;
