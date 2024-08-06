import React from "react";

interface NavbarProps {
    sendEvent?: (message: string, data: object) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sendEvent }) => {

    const handleAddItem = async () => {
        try {
            const inputText = (document.querySelector('input') as HTMLInputElement).value;
            await sendEvent("add", { url: inputText });
        } catch (err) {
            console.error('Add failed:', err);
        }
    }

    return (
        <nav className="flex items-center justify-between bg-gray-800 py-1 px-6">
            <div className="flex items-center">
                <i className="bi bi-list h-6 w-6 text-white mr-2"
                ></i>
                <span className="text-white font-semibold text-lg">Logo</span>
            </div>
            <div className="flex items-center bg-white rounded-md px-4 py-2">
                <i className="bi bi-search text-gray-500 h-5 w-5"></i>
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-2 bg-transparent outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddItem}>
                    Add
                </button>
            </div>
            <i className="bi bi-three-dots-vertical text-white h-6 w-6"></i>
        </nav>
    );
};

export default Navbar;