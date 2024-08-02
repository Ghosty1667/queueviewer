import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Queue, QueueItem, ActiveVideo } from './types';

interface useSocketProps {
    queue: QueueItem[] | null;
    loading: boolean;
    currentVideo: ActiveVideo | undefined;
    deleteData: (id: number) => void;
    changeActive: (id: number) => void;
    addData: (url: string) => void;
}

const useSocket = (url: string): useSocketProps => {

    const [socket, setSocket] = useState<Socket | null>(null);
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

        setSocket(socket)

        return () => {
            socket.disconnect();
        };
    }, [url]);



    const handleData = useCallback((jsonData: Queue | ActiveVideo) => {
        if ('items' in jsonData) {
            setQueue(jsonData.items);
            setCurrentVideo(jsonData.activeVideo);
        } else {
            setCurrentVideo(jsonData);
        }
        setLoading(false);
    }, []);

    const emitEvent = useCallback((event: string, data: { id?: number, url?: string }) => {
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
    }, [socket]);

    const deleteData = useCallback((id: number) => {
        return emitEvent('delete', { id });
    }, [emitEvent]);

    const changeActive = useCallback((id: number) => {
        return emitEvent('play', { id });
    }, [emitEvent]);

    const addData = useCallback((url: string) => {
        return emitEvent('add', { url });
    }, [emitEvent]);


    return { queue, currentVideo, loading, deleteData, addData, changeActive };
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

        // const handleVideoUpdate = (video: ActiveVideo) => {
        //     setCurrentVideo(video);
        // };

        dummySocket.on('data', handleData);
        // dummySocket.on('video-update', handleVideoUpdate);

        return () => {
            dummySocket.disconnect();
        };
    }, []);


    const deleteData = useCallback((id: number) => {
        return new Promise((resolve) => {
            // Dummy implementation
            console.log('Delete event emitted:', id);
            resolve({ status: 'ok' });
        });
    }, []);

    const changeActive = useCallback((id: number) => {
        return new Promise((resolve) => {
            // Dummy implementation
            console.log('ChangeActive event emitted:', id);
            resolve({ status: 'ok' });
        });
    }, []);

    const addData = useCallback((url: string) => {
        return new Promise((resolve) => {
            // Dummy implementation
            console.log('Add event emitted:', url);
            resolve({ status: 'ok' });
        });
    }, []);


    return { queue, currentVideo, loading, deleteData, addData, changeActive };
};
