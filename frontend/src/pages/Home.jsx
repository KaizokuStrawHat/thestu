import React from "react";

export default function Home(){
    return(
        <div>
            {/* https://css-tricks.com/snippets/css/typewriter-effect/ */}
            <div className='flex flex-col p-20'>
                <h1 className='text-center whitespace-nowrap'> A brand new dance studio in Edmonton AB</h1>
                <h2 className='text-center whitespace-nowrap'> A place you can call home. </h2>
            </div>
            <div className="flex justify-center items-center gap-10">
                <button>Why Dance?</button>
            </div>
        </div>
    )
}