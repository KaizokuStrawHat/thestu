import React, { useState, useRef, useEffect } from 'react';

/* 


*/

export default function ComboBox({ options = [], name, setState }) {
    
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setFilteredOptions(
            options.filter(option =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    }, [inputValue]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="relative block" ref={inputRef}>
            <input
                className="border p-4 rounded w-26 flex items-center space-x-4"
                type="text"
                value={inputValue}
                placeholder={`Select ${name}`}
                onChange={e => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                    setState(e.target.value)
                }}
            />

            {showDropdown && (
                <div className="absolute top-full mt-2 w-26 border rounded bg-white z-10">
                    {filteredOptions.map(option => (
                        <div
                            key={option}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setInputValue(option);
                                setShowDropdown(false);
                                setState(option)
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}