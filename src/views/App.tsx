import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import Player from './Player';
import Navbar from './Navbar';
import QueueList from './Queue';

import { Queue, QueueItem, ActiveVideo } from './types';
import useSocket, { useDummySocket } from './Socket';

// Get the container element
const container = document.getElementById('root');

const App: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    const { queue, currentVideo, loading, deleteData } = (import.meta as any).env.VITE_DUMMY_DATA ? useDummySocket() : useSocket((import.meta as any).env.SOCKET_URL || 'http://localhost:3000/');

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            {loading ? (<p>Loading</p>)
                : (
                    queue && (<div className="flex overflow-hidden">
                        <Player {...currentVideo} />
                        <QueueList onDelete={deleteData} items={queue} />
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