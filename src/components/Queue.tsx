import React, { useEffect, useState } from 'react';

import { QueueItem } from '../types/api';


interface QueueListProps {
    items: QueueItem[];
    sendEvent: (message: string, data: object) => void;

}

const QueueList: React.FC<QueueListProps> = ({ items, sendEvent }) => {
    const [queueItems, setQueueItems] = useState(items);

    useEffect(() => {
        setQueueItems(items)
    }, [items])

    const handleDrag = async (index: number, newIndex: number) => {
        const updatedQueueItems = [...queueItems];
        const [removedItem] = updatedQueueItems.splice(index, 1);
        updatedQueueItems.splice(newIndex, 0, removedItem);
        setQueueItems(updatedQueueItems);

        try {
            await sendEvent("changeOrder", { item: items[index].id, newItem: items[newIndex].id, itemIndex: index, newItemIndex: newIndex });
        } catch (err) {
            setQueueItems(items);
            console.error('Add failed', err);
        }
    };

    const handleChange = async (item: QueueItem) => {
        try {
            await sendEvent('play', { id: item.id });
        } catch (err) {
            console.error('Add failed', err);
        }
    };

    const handleDelete = async (item: QueueItem) => {
        try {
            await sendEvent('delete', { id: item.id });
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
        e.dataTransfer.setDragImage(e.target as Element, 0, 0);
    };

    const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.style.borderBottom = '2px solid #ffffff';
    };

    const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
        e.currentTarget.style.borderBottom = 'none';
    };

    const handleDrop = (e: React.DragEvent<HTMLButtonElement>, dropIndex: number) => {
        const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
        handleDrag(draggedIndex, dropIndex);
        e.currentTarget.style.borderBottom = 'none';
    };


    return (
        <div className="flex flex-col overflow-y-auto">
            {queueItems.map((item, index) => (
                <button
                    key={index}
                    className="flex items-center justify-between space-x-4 bg-gray-700 hover:bg-gray-500 text-white p-2"
                    draggable
                    onClick={() => { handleChange(item) }}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <img src={item.thumbnail} alt="Thumbnail" className="w-16 h-16" />
                    <div>
                        <p>{item.name}</p>
                    </div>
                    <div onClick={() => handleDelete(item)} className="btn btn-danger hover:text-red-600" style={{ fontSize: "32px" }}>
                        <i className="bi bi-x"></i>
                    </div>
                </button>
            ))
            }
        </div >
    );
};

export default QueueList;
