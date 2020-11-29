import React from 'react';
import { SocketProvider } from './context/SocketContext';
import HomePages from './pages/HomePages';


const BandNamesApp = () => {
    return (
        <SocketProvider>
            <HomePages />
        </SocketProvider>
    )
}

export default BandNamesApp
