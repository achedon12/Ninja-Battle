import {useEffect, useState} from 'react';

const Kunai = ({direction, heroPosition, heroSize}) => {

    const [position, setPosition] = useState({
        x: heroPosition.x + heroSize.width / 2,
        y: heroPosition.y + heroSize.height / 3
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        import('../../../assets/heroe/weapon/Kunai.png')
            .then(imageModule => {
                setImage(imageModule.default);
            });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPosition(prevPosition => ({
                x: prevPosition.x + (direction === 'right' ? 10 : -10),
                y: prevPosition.y
            }));
        }, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, [direction]);

    if (!image) return null;

    return (
        <img
            src={image}
            alt="kunai"
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                bottom: `${position.y}px`,
                width: 'auto',
                height: '50px',
                transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                rotate: direction === 'left' ? '-90deg' : '90deg'
            }}
        />
    );
};

export default Kunai;