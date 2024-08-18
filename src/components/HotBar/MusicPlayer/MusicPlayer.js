import {useEffect, useState} from 'react';
import '../../../assets/css/musicPlayer.css';
import {
    MusicalNoteOutline,
    PauseCircleOutline,
    PlayCircleOutline, RepeatOutline,
    VolumeMediumOutline,
    VolumeMuteOutline
} from "react-ionicons";
import Modal from 'react-modal';

const MusicPlayer = ({playing, setPlaying, audio, showPlayer, setShowPlayer}) => {
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audio]);

    useEffect(() => {
        setShowPlayer();
    }, [setShowPlayer, showModal]);

    useEffect(() => {
        setShowModal(showPlayer);
    }, [showPlayer]);

    const togglePlayPause = () => {
        setPlaying(!playing);
    };

    const handleVolumeChange = (e) => {
        const volume = e.target.value;
        setVolume(volume);
        if (audio) {
            audio.volume = volume;
        }
    };

    const handleProgressChange = (e) => {
        const progress = e.target.value;
        setProgress(progress);
        if (audio) {
            audio.currentTime = (progress / 100) * audio.duration;
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audio) {
            audio.muted = !isMuted;
        }
    };

    const toggleLoop = () => {
        setIsLoop(!isLoop);
        if (audio) {
            audio.loop = !isLoop;
        }
    };

    return (
        <div className="music-player">
            <MusicalNoteOutline
                color={'#000000'}
                height="30px"
                width="30px"
                onClick={() => setShowModal(!showModal)}
            />
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                <div className="controls">
                    {playing ? (
                        <PlayCircleOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            onClick={togglePlayPause}
                        />
                    ) : (
                        <PauseCircleOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            onClick={togglePlayPause}
                        />
                    )}
                    {isLoop ? (
                        <RepeatOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            style={{backgroundColor: 'grey', borderRadius: '50%', padding: '5px'}}
                            onClick={toggleLoop}
                        />
                    ) : (
                        <RepeatOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            onClick={toggleLoop}
                        />
                    )}
                    {isMuted ? (
                        <VolumeMediumOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            onClick={toggleMute}
                        />
                    ) : (
                        <VolumeMuteOutline
                            color={'#000000'}
                            height="30px"
                            width="30px"
                            onClick={toggleMute}
                        />
                    )}
                </div>
                <div className="progress-container">
                    <input
                        type="range"
                        value={progress}
                        onChange={handleProgressChange}
                    />
                    <div className="time-info">
                        <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span> /
                        <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                </div>
                <div className="volume-container">
                    <label>Volume</label>
                    <input
                        type="range"
                        value={volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleVolumeChange}
                    />
                </div>
            </Modal>

        </div>
    );
};

export default MusicPlayer;
