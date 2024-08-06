import React, { Children } from 'react';


interface SideBarProps {
    children: React.ReactNode;
}



const SideBar: React.FC<SideBarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <div className={`bg-gray-700 text-white w-64 min-h-screen ${isOpen ? 'w-64 ' : 'w-22'}`}>
                <div className="flex">
                    <h1 className="bg-gray-700 text-white py-2 px-4 text-lg font-semibold">Up next</h1>
                    <i onClick={toggleSidebar} className="bi bi-chevron-double-right text-white text-2xl" />
                </div>

                <ul>
                    {children}
                </ul>

            </div>
            <div className="flex-1">

            </div>
        </div>
    );
};

export default SideBar;