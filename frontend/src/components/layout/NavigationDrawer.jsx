import '../../styles/index.css'
import  React, { useState } from 'react';
import NavigationLayoutMobile from './NavigationLayoutMobile';
import * as Unicons from '@iconscout/react-unicons';

export default function NavigationDrawer(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            { isOpen && (
               <NavigationLayoutMobile isOpen={isOpen} />
            )}  
            <button onClick={() => setIsOpen(!isOpen)} 
            className='p-4 flex border-4 rounded-full 
            fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2
            '> {isOpen ? <Unicons.UilSignout/> : <Unicons.UilBars/>} </button>
        </>
    );
} 