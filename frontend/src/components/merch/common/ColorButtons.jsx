import React from "react";

export default function ColorButtons({colors, selectedColor, setSelectedColor})
{
    return(
        <>
            {colors.map((color, index) => (
            <React.Fragment key={index}>
                <input 
                type="radio"
                id={`choice-${index}`}
                name="colorChoice"
                value={color}
                className="hidden"
                onChange={() => setSelectedColor(color)}
                checked={selectedColor === color}
                />
                <label 
                htmlFor={`choice-${index}`}
                className={`w-6 h-6 rounded-full border-2 cursor-pointer`}
                style={{
                    backgroundColor: color, 
                    borderColor: selectedColor === color ? '#b3b3b3' : 'white',
                    boxShadow: selectedColor === color ? `0 0 0 2px ${color}` : ''
                }}
                ></label>
            </React.Fragment>
            ))}
        </>
    )
}