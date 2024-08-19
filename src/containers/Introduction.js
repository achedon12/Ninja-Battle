import React, {useEffect, useState} from "react";
import '../assets/css/introduction.css';
import {CogOutline, GameControllerOutline, InformationCircleOutline, PlayOutline, TrophyOutline} from "react-ionicons";
import GameButton from "../components/GameButton/GameButton";

const Introduction = ({setIntro, onPlayClick}) => {
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [showText, setShowText] = useState(false);

    const text = "Ninja Legends";
    const letters = text.split('').map((letter, index) => (
        <span key={index} style={{animationDelay: `${index * 0.05}s`}} className="letter-title">
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
                <div className="buttons-container">
                    <GameButton
                        onClick={handlePlayClick}
                        text="Play"
                        hover
                        icon={
                            <PlayOutline
                                color={'#fff'}
                                title={"Play"}
                                height="30px"
                                width="30px"
                                beat={true}
                                beatInterval={2000}
                                style={{filter: 'drop-shadow(0 0 5px #fff)'}}
                            />
                        }
                    />
                    <div className="buttons-container__separator"/>
                    <div className="sub-buttons-container">
                        <GameButton
                            hover
                            onClick={() => {
                            }}
                            icon={<TrophyOutline color={'#fff'} title={"Play"} height="30px" width="30px"
                                                 style={{filter: 'drop-shadow(0 0 5px #fff)'}}/>}
                        />
                        <GameButton
                            hover
                            onClick={() => {
                            }}
                            icon={<CogOutline color={'#fff'} title={"Play"} height="30px" width="30px"
                                              style={{filter: 'drop-shadow(0 0 5px #fff)'}}/>}
                        />
                        <GameButton
                            hover
                            onClick={() => {
                            }}
                            icon={<GameControllerOutline color={'#fff'} title={"Play"} height="30px" width="30px"
                                                         style={{filter: 'drop-shadow(0 0 5px #fff)'}}/>}
                        />
                        <GameButton
                            hover
                            onClick={() => {
                            }}
                            icon={<InformationCircleOutline color={'#fff'} title={"Play"} height="30px" width="30px"
                                                            style={{filter: 'drop-shadow(0 0 5px #fff)'}}/>}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Introduction;