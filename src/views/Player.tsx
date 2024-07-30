import React, { useEffect, useRef } from 'react';

const Player: React.FC = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const playerRef = useRef<YT.Player|null>(null)

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag) {
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        (window as any).onYouTubeIframeAPIReady = () => {
            if (iframeRef.current) {
                playerRef.current = new YT.Player(iframeRef.current, {events: {onReady: OnPlayerReady}});
            }
        }
    }, []);

    const OnPlayerReady = (event: YT.PlayerEvent) => {
        console.log("funny :)");
        console.log(playerRef.current.getVideoUrl() + "TEST");
    }

    return (
        <div className="w-full max-h-screen aspect-video overflow-hidden">
            <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/7lwkojqTtO0?enablejsapi=1"
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