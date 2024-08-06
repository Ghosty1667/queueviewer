import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Queue, QueueItem, ActiveVideo } from './types';

interface useSocketProps {
    queue: QueueItem[] | null;
    loading: boolean;
    currentVideo: ActiveVideo | undefined;
    sendEvent: <T extends object, >(message: string, data: T) => void;
}

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

const QueueItems: QueueItem[] = [
    {
        id: 0,
        thumbnail: 'http://placekitten.com/200/300',
        url: "ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 1',
    },
    {
        id: 1,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 2',
    },
    {
        id: 2,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 3',
    },
    {
        id: 3,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 4',
    },
    {
        id: 4,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 5',
    },
    {
        id: 5,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 6',
    },
    {
        id: 6,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 7',
    },
    {
        id: 7,
        thumbnail: 'http://placekitten.com/200/300',
        url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
        name: 'Video 8',
    },


];

const testQueue: Queue = {
    items: QueueItems,
    activeVideo: {
        item: QueueItems[0],
        isPaused: false,
        timestamp: 20
    }
}

const dummySocket = {
    on: (event: string, callback: (data: Queue | ActiveVideo | null) => void) => {
        if (event === 'data') {
            callback(testQueue);
        } else if (event === 'video-update') {
            callback(testQueue.activeVideo);
        }
    },
    disconnect: () => {
        console.log('Disconnected');
    }
};


export const useDummySocket = (): useSocketProps => {
    const [queue, setQueue] = useState<QueueItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentVideo, setCurrentVideo] = useState<ActiveVideo | null>(null);

    useEffect(() => {
        const handleData = (data: Queue) => {
            setQueue(data.items);
            setCurrentVideo(data.activeVideo);
            setLoading(false);
        };

        dummySocket.on('data', handleData);

        return () => {
            dummySocket.disconnect();
        };
    }, []);


    const sendEvent = <T extends object,>(message: string, data: T) => {
        console.log('Event emitted:', message, data);
    };

    return { queue, currentVideo, loading, sendEvent };
};
