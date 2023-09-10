import React, { useState } from 'react';

export const AppLayout = ({mainContent} : {mainContent: React.ReactNode}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <div className={`md:block md:w-64 ${sidebarOpen ? "block" : "hidden"}`}>
                <div className="md:fixed inset-y-0 left-0 flex-shrink-0 w-64 h-full p-8 bg-gray-800">
                    {/* Content of the sidebar */}
                    <div className="text-white">Sidebar Content</div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Mobile menu button */}
                <button
                    className="md:hidden p-4"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    ☰
                </button>

                {/* Content */}
                <main className="flex-1 p-8">
                    {mainContent}
                </main>
            </div>
        </div>
    );
}