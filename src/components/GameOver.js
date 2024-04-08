import "./GameOver.css";

const GameOver = ({ retry }) =>{
    return (
        <div>
            <div> GameOver </div>
            <button onClick={ retry }> Jogar Novamente </button>
        </div>        
    );
}

export default GameOver;