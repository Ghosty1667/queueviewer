import React, { useState } from 'react';

const Queue = () => {
    const [queueItems, setQueueItems] = useState([
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
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
        {
            thumbnail: 'http://placekitten.com/200/300',
            duration: '4:15',
            name: 'Video 4',
        },
    ]);

    const handleDrag = (index: number, newIndex: number) => {
        const updatedQueueItems = [...queueItems];
        const [removedItem] = updatedQueueItems.splice(index, 1);
        updatedQueueItems.splice(newIndex, 0, removedItem);
        setQueueItems(updatedQueueItems);
    };

    const handleDelete = (index: number) => {
        const updatedQueueItems = [...queueItems];
        updatedQueueItems.splice(index, 1);
        setQueueItems(updatedQueueItems);
    };

    return (
        <div className="flex w-[25%] flex-col h-screen overflow-y-auto">
            {queueItems.map((item, index) => (
                <button
                    key={index}
                    className="flex items-center justify-between space-x-4 bg-gray-700 hover:bg-gray-500 text-white p-2"
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', index.toString());
                        e.dataTransfer.setDragImage(e.target as Element, 0, 0);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.style.borderBottom = '2px solid #ffffff';
                    }}
                    onDragLeave={(e) => {
                        e.currentTarget.style.borderBottom = 'none';
                    }}
                    onDrop={(e) => {
                        const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
                        handleDrag(draggedIndex, index);
                        e.currentTarget.style.borderBottom = 'none';
                    }}
                >
                    <img src={item.thumbnail} alt="Thumbnail" className="w-16 h-16" />
                    <div>
                        <p>{item.duration}</p>
                        <p>{item.name}</p>
                    </div>
                    <button onClick={() => handleDelete(index)} className="btn btn-danger">
                        <i className="bi bi-x"></i>
                    </button>
                </button>
            ))}
        </div>
    );
};

export default Queue;
