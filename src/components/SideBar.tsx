import React from 'react';


interface SideBarProps {
    children: React.ReactNode;
    sendEvent?: (message: string, data: object) => void;
}



const SideBar: React.FC<SideBarProps> = ({ children, sendEvent }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const handleAddItem = async () => {
        try {
            const inputText = (document.querySelector('input') as HTMLInputElement).value;
            await sendEvent("add", { url: inputText });
        } catch (err) {
            console.error('Add failed:', err);
        }
    }


    return (
        <div className="flex flex-col h-screen">
            <div className={`bg-gray-700 text-white ${isOpen ? 'w-64' : 'w-22'} flex flex-col h-full`}>
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-lg font-semibold">Up next</h1>
                    <i onClick={toggleSidebar} className="bi bi-chevron-double-right text-white text-2xl" />
                </div>
                <ul className="flex-1 overflow-y-auto">
                    {children}
                </ul>
                <div className="bg-gray-800 p-2 sticky bottom-0 flex items-center">
                    <input type="text" placeholder="Search" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SideBar;