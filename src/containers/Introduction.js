import React, {useEffect, useState} from "react";
import '../assets/css/introduction.css';

const Introduction = ({setIntro, onPlayClick}) => {
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [showText, setShowText] = useState(false);

    const text = "Ninja Legends";
    const letters = text.split('').map((letter, index) => (
        <span key={index} style={{animationDelay: `${index * 0.05}s`}}>
            {letter === ' ' ? '\u00A0' : letter}
        </span>
    ));

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowText(true);
        }, 2000);

        const timer2 = setTimeout(() => {
            setShowPlayButton(true);
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    const handlePlayClick = () => {
        setIntro(false);
        onPlayClick();
    };

    return (
        <div className="introduction-container">
            <div className="ninja-animation">
                {/* Animation du ninja ici */}
            </div>
            {showText && (
                <p className="intro-text">{letters}</p>
            )}
            {showPlayButton && (
                <button className="play-button" onClick={handlePlayClick}>
                    Play
                </button>
            )}
        </div>
    );
};

export default Introduction;