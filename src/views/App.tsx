import { createRoot } from 'react-dom/client';
import React from 'react';
import Player from './Player';
import Navbar from './Navbar';
import Queue from './Queue';

// Get the container element
const container = document.getElementById('root');

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
    // Add more dummy data here
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

if (container) {
    const root = createRoot(container);
    root.render(
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex overflow-hidden">
                <Player />
                <Queue QueueItems={QueueItems} />
            </div>
        </div>
    );
} else {
    console.error('Root container not found');
}