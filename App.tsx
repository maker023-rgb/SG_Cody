import React, { useState, useEffect } from 'react';
import Hub from './components/Hub';
import Chat from './components/Chat';
import { ChatMode } from './types';

const App = () => {
    const [currentView, setCurrentView] = useState('hub');
    
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash === 'chat1' || hash === 'chat2') {
                setCurrentView(hash);
            } else {
                setCurrentView('hub');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial check

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'chat1':
                return <Chat key="chat1" mode="roadmap" />;
            case 'chat2':
                return <Chat key="chat2" mode="stats" />;
            case 'hub':
            default:
                return <Hub />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
            {renderView()}
        </div>
    );
};

export default App;
