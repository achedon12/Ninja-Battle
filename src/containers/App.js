import React, {useState, useEffect} from 'react';
import Introduction from "./Introduction";
import Environment from "./Environment";
import music from "../assets/musics/default.mp3";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import HotBar from "../components/HotBar/HotBar";

const App = () => {
    const [intro, setIntro] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const audio = new Audio(music);
        audio.loop = true;
        setAudio(audio);
    }, []);

    useEffect(() => {
        if (!audio) return;
        if (playing) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [playing]);

    return (
        <>
            {!intro && (<HotBar playing={playing} setPlaying={setPlaying} audio={audio}/>)}
            {intro ?
                <Introduction
                    setIntro={() => setIntro(false)}
                    onPlayClick={() => setPlaying(true)}
                />
                : <Environment/>
            }
        </>
    );
}

export default App;