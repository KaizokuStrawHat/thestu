import '../../index.css';
import  React, { useState } from 'react';
import NavigationLayout from '../layout/NavigationDrawerLayout';
import * as Unicons from '@iconscout/react-unicons';

export default function NavigationDrawer(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            { isOpen && (
               <NavigationLayout isOpen={isOpen} />
            )}  
            <button onClick={() => setIsOpen(!isOpen)} 
            className='p-8 flex border-4 rounded-full 
            fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2
            '> {isOpen ? <Unicons.UilSignout/> : <Unicons.UilBars/>} </button>
        </>
    );
} 



/*
const UpwardCollapsible = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                className="mt-auto" 
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Collapse' : 'Expand'}
            </button>

            {isOpen && (
                <div className="absolute bottom-full bg-blue-200 h-64 w-64">
                    <p>Some content...</p>
                </div>
            )}
        </div>
    );
};
*/