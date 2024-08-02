import React, { useState } from 'react';

import { Queue, QueueItem } from './types';

interface QueueListProps {
    items: QueueItem[];
    onDelete: (id: number) => Promise<void>;
}

const QueueList: React.FC<QueueListProps> = ({ items, onDelete }) => {
    const [queueItems, setQueueItems] = useState(items);



    const handleDrag = (index: number, newIndex: number) => {
        const updatedQueueItems = [...queueItems];
        const [removedItem] = updatedQueueItems.splice(index, 1);
        updatedQueueItems.splice(newIndex, 0, removedItem);
        setQueueItems(updatedQueueItems);
    };

    const handleDelete = async (item: QueueItem, index: number) => {
        try {
            await onDelete(item.id);
            const updatedQueueItems = [...queueItems];
            updatedQueueItems.splice(index, 1);
            setQueueItems(updatedQueueItems);
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="flex w-[25%] flex-col h-screen overflow-y-auto">
            <h1 className="bg-gray-700 text-white py-2 px-4 text-lg font-semibold">Up next</h1>
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
                        <p>buh</p>
                        <p>{item.name}</p>
                    </div>
                    <div onClick={() => handleDelete(item, index)} className="btn btn-danger hover:text-red-600">
                        <i className="bi bi-x"></i>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default QueueList;
