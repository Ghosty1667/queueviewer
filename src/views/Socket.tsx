import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Data {
    QueueEntry: number;
    Queue: Queue
}


interface Queue {
    QueueItems: QueueItem[];
}

interface QueueItem {
    thumbnail: string;
    duration: string;
    name: string;
    url?: string;
}


const useSocket = (url: string): { data: Data | null, loading: boolean } => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const socket: Socket = io(url);

        socket.on('data', (jsonData: Data) => {
            setData(jsonData);
            setLoading(false)
        });

        return () => {
            socket.disconnect();
        };
    }, [url]);

    return { data, loading };
};

export default useSocket;