import React, { useEffect, useRef, useState } from 'react';

import { ActiveVideo } from './types';


declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

interface PlayerEvents extends ActiveVideo {
    sendEvent?: (message: string, data: object) => void;
}



const Player: React.FC<PlayerEvents> = ({ item, timestamp, sendEvent }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const playerRef = useRef<YT.Player | null>(null)

    const isYouTubeAPIReady = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

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
            if (isYouTubeAPIReady.current) return;
            isYouTubeAPIReady.current = true;

            playerRef.current = new window.YT.Player(iframeRef.current, {
                videoId: item.url,
                playerVars: {
                    origin: window.location.origin,
                    autoplay: 1,
                },
                events: {
                    onReady: OnPlayerReady,
                    onStateChange: stateChange,

                },
            }
            );
        };


        const OnPlayerReady = (event: YT.PlayerEvent) => {
            event.target?.seekTo(timestamp, true);
            setIsLoading(false);
        };

        const changeVideo = (videoId: string, timestamp: number) => {
            if (playerRef.current) {
                if (!playerRef.current.getVideoUrl().includes(videoId)) {
                    playerRef.current.loadVideoById(videoId);
                }
                playerRef.current.seekTo(timestamp, true);
            }
        };

        if (!window.YT) {
            loadYouTubeAPI();
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }

        if (playerRef.current) {
            changeVideo(item.url, timestamp);
        }
    }, [item]);


    const stateChange = (event: YT.OnStateChangeEvent) => {
        if (playerRef.current) {
            if (event.data === YT.PlayerState.PAUSED) {
                const pauseStartTime = Date.now();
                const pauseInterval = setInterval(() => {
                    const pauseDuration = Date.now() - pauseStartTime;
                    if (pauseDuration >= 500) {
                        sendEvent('pause', { timestamp: playerRef.current.getCurrentTime() });
                        clearInterval(pauseInterval);
                        console.log('pause');
                    }
                }, 1000);

                playerRef.current.addEventListener('onStateChange', (stateChangeEvent: YT.OnStateChangeEvent) => {
                    if (stateChangeEvent.data !== YT.PlayerState.PAUSED) {
                        clearInterval(pauseInterval);
                    }
                });
            }
        }
    }

    return (
        <div className="w-full max-h-screen aspect-video">
            <div
                ref={iframeRef}
                className={`w-full h-full aspect-video overflow-hidden ${isLoading} ? 'animate-pulse' : ''`}
            ></div>
        </div>
    );
};

export default Player;