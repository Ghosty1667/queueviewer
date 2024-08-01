import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import Player from './Player';
import Navbar from './Navbar';
import QueueList from './Queue';

import { Queue, QueueItem, ActiveVideo } from './types';
import useSocket, { useDummySocket } from './Socket';

// Get the container element
const container = document.getElementById('root');

declare global {
    interface Window {
        SOCKET_URL?: string;
    }
}





const App: React.FC = () => {

    // const { queue, currentVideo, loading } = useSocket(window.SOCKET_URL || 'http://localhost:3000/');

    const { queue, currentVideo, loading } = useDummySocket();

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {loading ? (<p>Loading</p>)
                : (
                    queue && (<div className="flex overflow-hidden">
                        <Player {...currentVideo} />
                        <QueueList items={queue} />
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