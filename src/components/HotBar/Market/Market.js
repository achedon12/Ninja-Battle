import {useState} from "react";
import Modal from 'react-modal';
import {PricetagOutline} from "react-ionicons";

const Market = ({}) => {
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="market">
            <PricetagOutline
                color={'#000000'}
                height="30px"
                width="30px"
                onClick={() => setShowModal(!showModal)}
            />
            <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>

            </Modal>

        </div>
    );
};

export default Market;