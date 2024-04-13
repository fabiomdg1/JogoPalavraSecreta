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
  
  const [pickedWord, setPickedWord] = useState("");            // Palavra que vai ser escolhida
  const [pickedCategory, setPictureCategory] = useState("");   // Categoria que vai ser escolhida
  const [letters, setLetters] = useState([]);                  // Letra que vai ser escolhida
  const [guessedLetters, setGuessedLetters] = useState([]);    // Letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]);        // Letras erradas
  const [guesses, setGuesses] = useState(3);                   // Quantidade de tentativas do usuário
  const [score, setScore] = useState(0);                       // Pontuação do jogador


  const pickWordAndCategory = () =>{
    const categories = Object.keys(words);                                                     // Pega as chaves do objeto words
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];   // Pega uma categoria aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)];          // Pega uma palavra aleatória da categoria acima

    return { word, category };
  }

  // Inicia o Jogo
  const startGame = () =>{

    const { word, category } = pickWordAndCategory();
    
    let wordLetters = word.split("");                                                   // Criando um array de letras
    let wordLetter = wordLetters.map((l) => l.toLowerCase());                           // Convertendo para letras minúsculas
    console.log(category);
    console.log(wordLetter);

    // Atualiza o estado das tres variáveis (pickedWord, pickedCategory, letters)
    setPickedWord(word);
    setPictureCategory(category);
    setLetters(wordLetter);

   pickWordAndCategory();

    setGameStage(stages[1].name);
  }

  // Processa a letra digitada
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase();

    // Verifica se a letra digitada já foi utilizada antes
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }
    
    // Verifica se a letra está correta ou incorreta
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    }
    console.log("Corretas: " + guessedLetters);
    console.log("Incorretas: " + wrongLetters);
  };

  

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


  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame = { startGame } /> }
      { gameStage === "game" && <Game 
        verifyLetter = { verifyLetter } 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        /> }
      { gameStage === "end" && <GameOver retry = { retry }/> } 
    </div>
  );
}

export default App;
