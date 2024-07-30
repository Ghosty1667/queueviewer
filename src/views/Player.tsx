import React from 'react';

const Player: React.FC = () => {
    return (

        <div className="w-full aspect-video ">
            <iframe
                src="https://www.youtube.com/embed/7lwkojqTtO0?si=UmmWMasQPfasO91Q"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
            ></iframe>
        </div>

    );
};

export default Player;