import React, { useEffect, useRef } from 'react';

import { ActiveVideo } from './types';


const Player: React.FC<ActiveVideo> = ({ item, timestamp }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const playerRef = useRef<YT.Player | null>(null)

    useEffect(() => {

        const loadYouTubeAPI = () => {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag) {
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }
        }

        const onYouTubeIframeAPIReady: () => void = () => {
            playerRef.current = new window.YT.Player(iframeRef.current, {
                videoId: item.url,
                playerVars: {
                    origin: window.location.origin,
                    autoplay: 1,
                },
                events: { onReady: OnPlayerReady }
            });
        };
        


        if (!window.YT) {
            loadYouTubeAPI();
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }
    }, [item.url]);


    // useEffect(() => {
    //     if (playerRef.current) {
    //         playerRef.current.loadVideoById(item.url);
    //     }
    // }, []);


    const OnPlayerReady = (event: YT.PlayerEvent) => {
        event.target?.seekTo(timestamp, true);

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