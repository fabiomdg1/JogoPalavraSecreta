import "./GameOver.css";

const GameOver = (props) =>{
    return (
        <div>
            <h1> Fim de Jogo </h1>
            <h2> A sua pontuação foi: <span>{ props.score }</span></h2>
            <button onClick={ props.retry }> Jogar Novamente </button>
        </div>        
    );
}

export default GameOver;