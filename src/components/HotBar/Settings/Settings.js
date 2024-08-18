import {CogOutline} from "react-ionicons";
import {useEffect, useState} from "react";
import '../../../assets/css/settings.css';
import Modal from 'react-modal';

const Settings = ({showSettings, setShowSettings}) => {

    const [showModal, setShowModal] = useState(showSettings);

    useEffect(() => {
        setShowSettings();
    }, [setShowSettings, showModal]);

    useEffect(() => {
        setShowModal(showSettings);
    }, [showSettings]);

    return (
        <div className="settings">
            <CogOutline
                color={'#000000'}
                height="30px"
                width="30px"
                onClick={() => setShowModal(!showModal)}
            />
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
                <div className="settings-content">
                    <h1>Settings</h1>
                    <p>Settings content here</p>
                </div>
            </Modal>
        </div>
    );

};

export default Settings;