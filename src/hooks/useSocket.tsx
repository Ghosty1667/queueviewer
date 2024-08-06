import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Queue, QueueItem, ActiveVideo, useSocketProps } from '../types/api';

const useSocket = (url: string): useSocketProps => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [queue, setQueue] = useState<QueueItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<ActiveVideo | null>(null);

    useEffect(() => {
        const socket: Socket = io(url);

        socket.on('data', (jsonData: Queue) => {
            handleData(jsonData);
        });

        socket.on('video-update', (jsonData: ActiveVideo) => {
            setCurrentVideo(jsonData);
            setLoading(false)
        });

        setSocket(socket)

        return () => {
            socket.disconnect();
        };
    }, [url]);



    const handleData = (jsonData: Queue | ActiveVideo) => {
        if ('items' in jsonData) {
            setQueue(jsonData.items);
            setCurrentVideo(jsonData.activeVideo);
        } else {
            setCurrentVideo(jsonData);
        }
        setLoading(false);
    };

    const emitEvent = (event: string, data: object) => {
        return new Promise((resolve, reject) => {
            if (socket) {
                socket.emit(event, data, (response: { status: string }) => {
                    if (response.status === 'ok') {
                        resolve(response);
                    } else {
                        reject(new Error(`${event} failed`));
                    }
                });
                console.log(`${event} event emitted:`, data);
            } else {
                reject(new Error('No socket connection'));
            }
        });
    };

    const sendEvent = <T extends object,>(message: string, data: T) => {
        return emitEvent(message, data);
    }

    return { queue, currentVideo, loading, sendEvent };
};

export default useSocket;

