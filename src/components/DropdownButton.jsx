import { useState } from "react";
import '../index.css';

export default function DropdownButton({name, listOfLinks}){
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
    <div>
        <button className="font-mono" onClick={toggleDropdown}>
            {name}
        </button>
        {isOpen && (
        <div className="absolute flex flex-col bg-white-300 padding-2 mt-1.5 gap-1.5">
            {
                listOfLinks.map((name, index) => (
                    <a href='#' key={index} className="block font-sans">{name}</a>
                ))
            }
        </div>
        )}
    </div>
    );
}
// NAME OF BUTTON
// ARRAY OF ANCHOR TAGS