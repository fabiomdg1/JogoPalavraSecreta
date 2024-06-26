import { useState, useRef } from "react";
import "./Game.css";
// const Game = ({ 
//         verifyLetter,
//         pickedWord,
//         pickedCategory,
//         letters,
//         guessedLetters,
//         wrongLetters,
//         guesses,
//         score,
//     }) =>{

        const Game = (props) =>{

        const [letter, setLetter] = useState("");
        const letterInputRef = useRef(null);

        const handleSubmit = (e) => {
            e.preventDefault();
            props.verifyLetter(letter);
            setLetter("");
            letterInputRef.current.focus();
        }

    return (
        <div>
            <div className="game">
                <p className="points">
                    <span>Pontuação: {props.score}</span>
                </p>
                <h1>Adivinhe a palavra</h1>
                <h3 className="tip">
                    Dica sobre a palavra <span> {props.pickedCategory} </span>
                </h3>
                <p> Você ainda tem {props.guesses} tentativas</p>
                <div className="wordContainer">

                {props.letters.map((letter, i) => (
                    props.guessedLetters.includes(letter) ? (
                        <span key={i} className="letter"> {letter} </span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
                     
                </div>
                <div className="letterContainer">
                    <p>Tente adivinhar uma letra da palavra:</p>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="letter" 
                            maxLength={1} 
                            required 
                            onChange={(e) => setLetter(e.target.value)}
                            value={letter}
                            ref={letterInputRef}>
                        </input>
                        
                        <button>Jogar!</button>                      
                    </form>
                </div>
                <div className="wrongLettersContainer">
                    <p>Letras já utilizadas: </p>
                    <span>{`${props.wrongLetters} `}</span>                    
                </div>
            </div>
        </div>
    );
};

export default Game;