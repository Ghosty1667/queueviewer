import { createRoot } from 'react-dom/client';
import React from 'react';
import Player from './Player';
import Navbar from './Navbar';
import Queue from './Queue';

// Get the container element
const container = document.getElementById('root');


if (container) {
    const root = createRoot(container);
    root.render(
        <div className="flex flex-col ">
            <Navbar />
            <div className="flex">
                <Player />
                <Queue />
            </div>
        </div>
    );
} else {
    console.error('Root container not found');
}