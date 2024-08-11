import React, { useEffect, useRef, useState } from 'react';

import { ActiveVideo } from '../types/api';
import { debounce } from 'lodash';


declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

interface PlayerEvents extends ActiveVideo {
    sendEvent?: (message: string, data: object) => void;
}



const Player: React.FC<PlayerEvents> = ({ item, timestamp, sendEvent, isPaused }) => {
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
                if (isPaused) {
                    playerRef.current.pauseVideo();
                }
                else {
                    playerRef.current.playVideo();
                }
            }
        };

        if (item !== null) {
            if (!window.YT && item !== null) {
                loadYouTubeAPI();
                window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            } else {
                onYouTubeIframeAPIReady();
            }

            if (playerRef.current && item !== null) {
                changeVideo(item.url, timestamp);
            }
        }
    }, [item]);

    const previousTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const debouncedSendEvent = debounce((timeDifference: number) => {
            sendEvent('seek', { timestamp: timeDifference });
        }, 300);

        const checkSeek = () => {
            if (playerRef.current && item !== null) {
                const currentTime = playerRef.current.getCurrentTime();
                if (previousTimeRef.current !== null) {
                    const timeDifference = currentTime - previousTimeRef.current;
                    if (Math.abs(timeDifference) > 1) {
                        debouncedSendEvent(currentTime);
                    }
                }
                previousTimeRef.current = currentTime;
            }
            requestAnimationFrame(checkSeek);
        };

        const animationFrameId = requestAnimationFrame(checkSeek);

        return () => {
            cancelAnimationFrame(animationFrameId);
            debouncedSendEvent.cancel();
        };
    }, [item]);




    const stateChange = (event: YT.OnStateChangeEvent) => {
        if (playerRef.current && item !== null) {
            if (event.data === YT.PlayerState.PAUSED) {
                sendEvent('pause', { timestamp: playerRef.current.getCurrentTime() });
            }
            if (event.data === YT.PlayerState.PLAYING) {
                sendEvent('unpause', { timestamp: playerRef.current.getCurrentTime() });
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