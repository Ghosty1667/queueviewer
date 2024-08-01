import React, { useEffect, useRef, useState } from 'react';

import { ActiveVideo } from './types';


const Player: React.FC<ActiveVideo> = ({ item, isPaused, timestamp }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const playerRef = useRef<YT.Player | null>(null)

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag) {
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
        (window as any).onYouTubeIframeAPIReady = () => {
            if (iframeRef.current) {
                playerRef.current = new YT.Player(iframeRef.current, {
                    videoId: item.url,
                    playerVars: {
                        origin: window.location.origin,
                        autoplay: 1,
                    },
                    events: { onReady: OnPlayerReady }
                });
            }
        }
    }, []);


    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.loadVideoById(item.url);
        }
    }, [item.url]);






    const OnPlayerReady = (event: YT.PlayerEvent) => {
        console.log('Player ready');
        playerRef.current?.seekTo(timestamp);

    }

    return (
        <div className="w-full max-h-screen aspect-video overflow-hidden">
            <div
                ref={iframeRef}
                className="w-full h-full"
            ></div>
        </div>
    );
};

export default Player;