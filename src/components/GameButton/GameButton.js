import '../../assets/css/game-button.css';

const GameButton = ({onClick, text = '', icon = null, hover = false}) => {
    return (
        <button className={`play-button ${hover ? 'hover' : ''}`} onClick={onClick}>
            {icon && icon}
            {icon && text && (<div className="player-button-separator"/>)}
            {text && text}
        </button>
    );
}

export default GameButton;