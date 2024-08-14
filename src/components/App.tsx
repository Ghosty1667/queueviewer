
import { createRoot } from 'react-dom/client';
import React from 'react';
import Player from './Player';
import QueueList from './Queue';

import useSocket from '../hooks/useSocket';
import SideBar from './SideBar';



// Get the container element
const container = document.getElementById('root');

const App: React.FC = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { queue, currentVideo, loading, sendEvent } = useSocket(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000/');

    return (
        <div className="flex flex-col h-screen bg-gray-800">
            {loading ? <h1 className="text-white text-4xl w-full shrink-0 text-center mt-5 animate-pulse">Loading...</h1> :
                <div className="flex overflow-hidden">
                    <Player {...currentVideo} sendEvent={sendEvent} />
                    <SideBar sendEvent={sendEvent}>
                        <QueueList sendEvent={sendEvent} items={queue} />
                    </SideBar>
                </div>
            }

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