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

  // Palavra que vai ser escolhida
  const [pickedWord, setPickedWord] = useState("");

  // Categoria que vai ser escolhida
  const [pickedCategory, setPictureCategory] = useState("");

  // Letra que vai ser escolhida
  const [letter, setLetters] = ("");


  // Pega uma palavra e categoria aleatória
  const pickWordAndCategory = () =>{
    const categories = Object.keys(words); // Pega as chaves do objeto words
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // Pega uma categoria aleatória
    console.log(category);
  }


  // Inicia o Jogo
  const startGame = () =>{

    // Pegue uma palavra e uma categoria
    pickWordAndCategory();
    setGameStage(stages[0].name);
  }

  // Processa a letra digitada
  const verifyLetter = () =>{
    setGameStage(stages[1].name);
  }

  // Termina Jogo
  const gameOver = () =>{
    setGameStage(stages[2].name);
  }

  // Reseta o Jogo
  const retry = () =>{
    // setGameStage(stages[0].name);    
    startGame();
  }

  return (
    <div className="App">
      {/* { gameStage === "start" && <StartScreen startGame = { startGame } /> } */}
      { gameStage === "start" && <StartScreen startGame = { verifyLetter } /> }
      { gameStage === "game" && <Game gameOver = { gameOver }/> }
      { gameStage === "end" && <GameOver retry = { retry }/> } 
    </div>
  );
}

export default App;
