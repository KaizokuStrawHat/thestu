import React from "react";
import JoinButton from "../components/ui/JoinButton";

export default function Home(){
    return(
        <div>
            {/* https://css-tricks.com/snippets/css/typewriter-effect/ */}
            <div className='flex flex-col p-20'>
                <h1 className='text-center whitespace-nowrap'> A brand new dance studio in Edmonton AB</h1>
                <h2 className='text-center whitespace-nowrap'> A place you can call home. </h2>
            </div>
            <div className="flex justify-center items-center gap-10">
                <JoinButton/>
                <button>Why Dance?</button>
            </div>
        </div>
    )
}
// PC VERSION:
// LOGO -- NAV LINKS -- DROPDOWN BUTTONS
// Introduction
// Front Page News

// MOBILE VERSION:
// LOGO
// Introduction
// Front Page News
// Navigation Drawer

// has front page carousel -- hot news -- celebrities drop ins, events, etc