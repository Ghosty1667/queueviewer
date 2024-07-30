import React, { useState } from 'react';


interface Queue {
    QueueItems: QueueItem[];
}

interface QueueItem {
    thumbnail: string;
    duration: string;
    name: string;
    url?: string;
}

const Queue: React.FC<Queue> = ({ QueueItems }) => {
    const [queueItems, setQueueItems] = useState(QueueItems);

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
                        <p>{item.duration}</p>
                        <p>{item.name}</p>
                    </div>
                    <div onClick={() => handleDelete(index)} className="btn btn-danger hover:text-red-600">
                        <i className="bi bi-x"></i>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Queue;
