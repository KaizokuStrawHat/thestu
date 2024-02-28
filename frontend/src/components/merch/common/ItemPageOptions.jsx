import React, { useEffect } from 'react';
import { Size } from './Size';
import ColorButtons from './ColorButtons';

export default function ItemPageOptions({colors, selectedVariety, setSelectedColor, setImageValue, sizes, sizeValue, setSizeValue}){
    useEffect(() => {
        setImageValue(selectedVariety.picture)
    }, [selectedVariety])

    return(
        <>
            <div className="flex justify-between items-center">
                <div className='flex gap-2 mt-2'>
                {colors.map((color, index) => (
                    <React.Fragment key={index}>
                        <input 
                        type="radio"
                        id={`choice-${index}`}
                        name="colorChoice"
                        value={color}
                        className="hidden"
                        onChange={() => {
                            setSelectedColor(color)
                        }}
                        checked={selectedVariety.color === color}
                        />
                        <label 
                        htmlFor={`choice-${index}`}
                        className={`w-6 h-6 rounded-full border-2 cursor-pointer`}
                        style={{
                            backgroundColor: color, 
                            borderColor: selectedVariety.color === color ? '#b3b3b3' : 'white',
                            boxShadow: selectedVariety.color === color ? `0 0 0 2px ${color}` : ''
                        }}
                        />
                    </React.Fragment>))}
                </div>
                <Size sizes={sizes} sizeValue={sizeValue} setSizeValue={setSizeValue} />
            </div>
        </>
    ) 
}