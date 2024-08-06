
import { createRoot } from 'react-dom/client';
import React from 'react';
import Player from './Player';
import Navbar from './Navbar';
import QueueList from './Queue';

import useSocket from './Socket';

// Get the container element
const container = document.getElementById('root');

const App: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { queue, currentVideo, loading, sendEvent } = useSocket((import.meta as unknown).env.SOCKET_URL || 'http://localhost:3000/');

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            <Navbar sendEvent={sendEvent} />
            {loading ? (<p>Loading</p>)
                : (
                    queue && (<div className="flex overflow-hidden">
                        <Player {...currentVideo} sendEvent={sendEvent} />
                        <QueueList sendEvent={sendEvent} items={queue} />
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