import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import Player from './Player';
import Navbar from './Navbar';
import Queue from './Queue';
import useSocket from './Socket';

// Get the container element
const container = document.getElementById('root');

declare global {
    interface Window {
        SOCKET_URL?: string;
    }
}





const App: React.FC = () => {

    const { data, loading } = useSocket(window.SOCKET_URL || 'http://localhost:3000/');
    const [currentVideo, setCurrentVideo] = useState<string | null>(null);

    useEffect(() => {
        if (data && data.Queue.QueueItems.length > 0) {
            setCurrentVideo(data.Queue.QueueItems[0].url || null);
        }
    }, [data]);

    const QueueItems = [
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '3:45',
            name: 'Video 1',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '2:30',
            name: 'Video 2',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 3',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '5:10',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '1:50',
            name: 'Video 5',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '3:20',
            name: 'Video 6',
        },

    ];

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {loading ? (<p>Loading</p>)
                : (
                    data && (<div className="flex overflow-hidden">
                        <Player currentVideo={currentVideo} />
                        <Queue QueueItems={data.Queue.QueueItems} />
                    </div>)
                )}

        </div>
    )
}

if (container) {
    const root = createRoot(container);
    root.render(
        <App />
    );
} else {
    console.error('Root container not found');
}