import React from "react"

export default function Header({children}) {
    return(
        <div className='flex max-[864px]:flex-col w-screen bg-yellow-700 px-2 py-5 items-center gap-4'>
            {children}
        </div>
    )
}