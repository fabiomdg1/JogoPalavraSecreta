import './App.css';
import { useEffect, useState } from "react";
import { wordList } from "./data/words";

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [                                                // Estágios do jogo
  "start", "game", "end"
];

const guessesQtd = 3;                                          // Quantidade de tentativas

function App() {   
  const [gameStage, setGameStage] = useState(stages[0]);  
  const [words] = useState(wordList);                          // Lista de palavras, neste caso não é usado setWords porque não precisamos de uma função para atualizar seu valor
  const [pickedWord, setPickedWord] = useState("");            // Palavra que vai ser escolhida
  const [pickedCategory, setPictureCategory] = useState("");   // Categoria que vai ser escolhida
  const [letters, setLetters] = useState([]);                  // Letra que vai ser escolhida
  const [guessedLetters, setGuessedLetters] = useState([]);    // Letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]);        // Letras erradas
  const [guesses, setGuesses] = useState(guessesQtd);          // Quantidade de tentativas do usuário
  const [score, setScore] = useState(0);                       // Pontuação do jogador

//------------------------------------------------------------------------------//
  const pickWordAndCategory = () =>{
    const categories = Object.keys(words);                                                   
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; 
    const word = words[category][Math.floor(Math.random() * words[category].length)];        
    return { word, category };
  };

//------------------------------------------------------------------------------//
 const startGame = () =>{                                                 
    clearLetterStates();                                                              
    const { word, category } = pickWordAndCategory();                                 
    let wordLetters = word.split("");                                                 
    let wordLetter = wordLetters.map((l) => l.toLowerCase());                         
    setPickedWord(word);                                                              
    setPictureCategory(category);
    setLetters(wordLetter);
    pickWordAndCategory();
    setGameStage(stages[1]);
  };

  //------------------------------------------------------------------------------//
  const verifyLetter = (letter) =>{                                                               // Processa a letra digitada
    const normalizedLetter = letter.toLowerCase();
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){     // Verifica se a letra digitada já foi utilizada antes
      return;
    }    
    if(letters.includes(normalizedLetter)){                                                       // Verifica se a letra está correta ou incorreta
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  //------------------------------------------------------------------------------//
  //------------------------------Termina Jogo------------------------------------//

  const gameOver = () =>{                                                               
    setGameStage(stages[2]);
    console.log("End");
  };

  //------------------------------------------------------------------------------//
  //-------------------------------Reseta o Jogo----------------------------------//
  const retry = () =>{                                                                  
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0]);    
  };

  //------------------------------------------------------------------------------//
  //----------------Limpa todas as palavras corretas e incorretas-----------------//
  const clearLetterStates = () =>{      
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //------------------------------------------------------------------------------//
  //----------------------Verifica número de tentativas---------------------------//
  useEffect(() => {
    if(guesses <= 0){
      clearLetterStates();                                                                    
      setGameStage(stages[2]);
      return;
    }    
  }, [guesses]);

  //------------------------------------------------------------------------------//
  useEffect(() => {
    (guessedLetters.length >= 1) && setScore(guessedLetters.length * 100)
  }, [guessedLetters])

  console.log(gameStage);

  //------------------------------------------------------------------------------//
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
      { gameStage === "end" && <GameOver retry = { retry } score = { score } /> } 
    </div>
  );
}
//------------------------------------------------------------------------------//

export default App;
