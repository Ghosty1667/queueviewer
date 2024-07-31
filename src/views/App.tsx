import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import Player from './Player';
import Navbar from './Navbar';
import Queue from './Queue';

// Get the container element
const container = document.getElementById('root');


const App: React.FC = () => {

    const [currentVideo, setCurretVideo] = useState('https://www.youtube.com/embed/9bZkp7q19f0');

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
            <div className="flex overflow-hidden">
                <Player currentVideo={currentVideo} />
                <Queue QueueItems={QueueItems} />
            </div>
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