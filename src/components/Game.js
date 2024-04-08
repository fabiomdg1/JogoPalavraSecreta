import "./Game.css"
const Game = ({ game }) =>{
    return (
        <div>
            <h1>Game</h1>
            <button onClick={ game }>Jogar</button>            
        </div>
    );
};

export default Game;