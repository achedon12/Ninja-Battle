import {useEffect, useState} from "react";
import Kunai from "./weapon/Kunai";

const Heroe = ({
                   defaultName = 'Heroe',
               }) => {

    // Actions
    const [IDLE, RUN, SLIDE, THROW] = ['idle', 'run', 'slide', 'throw'];
    const DEFAULT_ACTION = IDLE;
    const [DIRECTION_LEFT, DIRECTION_RIGHT] = ['left', 'right'];
    const DEFAULT_DIRECTION = DIRECTION_RIGHT;

    const [position, setPosition] = useState({x: window.innerWidth / 3, y: 0});
    const [direction, setDirection] = useState(DEFAULT_DIRECTION);
    const [image, setImage] = useState(null);
    const [imageNumber, setImageNumber] = useState(0);
    const [action, setAction] = useState(DEFAULT_ACTION);
    const [lastAction, setLastAction] = useState(DEFAULT_ACTION);
    const [name, setName] = useState(defaultName);
    const [kunai, setKunai] = useState(null);

    useEffect(() => {
        setName(defaultName);
    }, [defaultName]);

    useEffect(() => {
        let intervalId;
        if (action === IDLE || action === RUN || action === SLIDE || action === THROW) {
            if (action === THROW) {
                setTimeout(() => {
                    setAction(lastAction);
                }, 500);
            }
            intervalId = setInterval(() => {
                setImageNumber(prevNumber => prevNumber === 9 ? 0 : prevNumber + 1);

            }, 75);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [IDLE, RUN, SLIDE, THROW, action, lastAction]);

    useEffect(() => {
        if (action === THROW && !kunai) {
            setKunai(<Kunai direction={direction} heroPosition={position} heroSize={{width: 100, height: 100}}/>);
        }
    }, [action, imageNumber, lastAction, direction, THROW, kunai, position]);

    useEffect(() => {
        import(`../../assets/heroe/${action}/${action.charAt(0).toUpperCase() + action.slice(1)}__00${imageNumber}.png`)
            .then(imageModule => {
                setImage(imageModule.default);
            });
    }, [action, imageNumber]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (event) => {
        let newX = position.x;
        let newY = position.y;

        switch (event.key) {
            case 'ArrowLeft':
                setAction(RUN);
                setDirection(DIRECTION_LEFT);
                setLastAction(action);
                break;
            case 'ArrowRight':
                setAction(RUN);
                setDirection(DIRECTION_RIGHT);
                setLastAction(action);
                break;
            case 'ArrowDown':
                setAction(SLIDE);
                setLastAction(action);
                break;
            case ' ':
                setAction(THROW);
                break;
            default:
                setAction(IDLE);
                break;
        }

        if (newX >= 0 && newX <= window.innerWidth && newY >= 0 && newY <= window.innerHeight) {
            setPosition({x: newX, y: newY});
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyUp = (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            setAction(IDLE);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleRightClick = (event) => {
        event.preventDefault();
        setAction(THROW);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('contextmenu', handleRightClick);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('contextmenu', handleRightClick);
        };
        // eslint-disable-next-line no-use-before-define
    }, [handleKeyDown, handleKeyUp, handleRightClick, position]);

    if (!image) {
        return null;
    }

    return (
        <div
            style={
                {
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }
            }
        >
            {(action === IDLE || action === RUN || action === SLIDE || action === THROW) && (
                <>
                    <div
                        style={{
                            position: 'absolute',
                            left: `${position.x}px`,
                            bottom: `${position.y + 150}px`,
                            color: 'white',
                            textAlign: 'center',
                            width: '100px',
                        }}
                    >
                        {name}
                    </div>
                    <img
                        src={image}
                        alt={name}
                        style={{
                            marginLeft: `${position.x}px`,
                            marginTop: window.innerHeight - 100 * 2 - position.y,
                            width: '100px',
                            height: '100px',
                            transform: direction === DIRECTION_LEFT ? 'scaleX(-1)' : 'scaleX(1)',
                            zIndex: 1,
                        }}
                    />
                    {kunai}
                </>
            )}
        </div>
    );
}

export default Heroe;