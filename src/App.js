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

  // Lista de palavras, neste caso não é usado setWords porque não precisamos de uma função para atualizar seu valor
  const [words] = useState(wordList);

  // Palavra que vai ser escolhida
  const [pickedWord, setPickedWord] = useState("");

  // Categoria que vai ser escolhida
  const [pickedCategory, setPictureCategory] = useState("");

  // Letra que vai ser escolhida
  const [letters, setLetters] = ("");


  // Pega uma palavra e categoria aleatória
  const pickWordAndCategory = () =>{
    const categories = Object.keys(words); // Pega as chaves do objeto words
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // Pega uma categoria aleatória
    //console.log(category);

    const word = words[category][Math.floor(Math.random() * words[category].length)];
    //console.log(word);

    return { word, category };
  }

  // Inicia o Jogo
  const startGame = () =>{
    const { word, category } = pickWordAndCategory();
    
    // Criando um array de letras
    let wordLetters = word.split("");
    let wordLetter = wordLetters.map((l) => l.toLowerCase());

    console.log(wordLetter);

    setPickedWord(word);
    setPictureCategory(category);
    setLetters(letters);

    pickWordAndCategory();

    setGameStage(stages[0].name);
    //console.log("Start");
  }

  // Processa a letra digitada
  const verifyLetter = () =>{
    setGameStage(stages[1].name);
    console.log("Game");
  }

  // Termina Jogo
  const gameOver = () =>{
    setGameStage(stages[2].name);
    console.log("End");
  }

  // Reseta o Jogo
  const retry = () =>{
    // setGameStage(stages[0].name);    
    startGame();
  }

  // useEffect(() => {
  //   startGame(); // Chamada da função startGame() quando o componente é montado
  // }, []); // O array de dependências está vazio, então a função será chamada apenas uma vez


  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame = { verifyLetter } /> }
      { gameStage === "game" && <Game gameOver = { gameOver }/> }
      { gameStage === "end" && <GameOver retry = { retry }/> } 
    </div>
  );
}

export default App;
