import '../../assets/css/hotbar.css';
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Settings from "../Settings/Settings";
import {useEffect, useState} from "react";

const HotBar = ({playing, setPlaying, audio}) => {

    const [showSettings, setShowSettings] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);


    useEffect(() => {
        if (showSettings) {
            setShowPlayer(false);
        }
    }, [showSettings]);

    useEffect(() => {
        if (showPlayer) {
            setShowSettings(false);
        }
    }, [showPlayer]);

    return (
        <div className="hotbar">
            <div className="hotbar-settings">
                <MusicPlayer playing={playing} setPlaying={setPlaying} audio={audio} setShowPlayer={setShowPlayer} showPlayer={showPlayer}/>
                <Settings setShowSettings={setShowSettings} showSettings={showSettings} />
            </div>
            <div className="hotbar-items">
            </div>
        </div>
    );
};

export default HotBar;