import "./Game.css"
const Game = ({ gameOver }) =>{
    return (
        <div>
            <h1>Game</h1>
            <button onClick={ gameOver }>Jogar</button>            
        </div>
    );
};

export default Game;