import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import { Queue, QueueItem, ActiveVideo } from './types';



const useSocket = (url: string): { queue: QueueItem[] | null, loading: boolean, currentVideo: ActiveVideo | undefined } => {
    const [queue, setQueue] = useState<QueueItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<ActiveVideo | null>(null);

    useEffect(() => {
        const socket: Socket = io(url);

        socket.on('data', (jsonData: Queue) => {
            setQueue(jsonData.items);
            setCurrentVideo(jsonData.activeVideo);
            setLoading(false)
        });


        socket.on('video-update', (jsonData: ActiveVideo) => {
            setCurrentVideo(jsonData);
            setLoading(false)
        });


        return () => {
            socket.disconnect();
        };
    }, [url]);

    return { queue, loading, currentVideo };
};

export default useSocket;