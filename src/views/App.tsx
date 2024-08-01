import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import Player from './Player';
import Navbar from './Navbar';
import QueueList from './Queue';

import { Queue, QueueItem, ActiveVideo } from './types';
import useSocket from './Socket';

// Get the container element
const container = document.getElementById('root');

declare global {
    interface Window {
        SOCKET_URL?: string;
    }
}





const App: React.FC = () => {

    const { queue, currentVideo, loading } = useSocket(window.SOCKET_URL || 'http://localhost:3000/');


    const QueueItems: QueueItem[] = [
        {
            id: 0,
            thumbnail: 'http://placekitten.com/200/300',
            url: "https://www.youtube.com/embed/ZaxUZH0cbhM?si=kXxYziYygWmuykb2",
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

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {loading ? (<p>Loading</p>)
                : (
                    queue && (<div className="flex overflow-hidden">
                        <Player {...currentVideo} />
                        <QueueList {...queue} />
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