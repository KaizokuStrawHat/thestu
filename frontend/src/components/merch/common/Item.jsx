import React, { useState, useEffect } from 'react';
export default function Item({name, choices}){
    const [selectedColor, setSelectedColor] = useState(choices[0].color)
    
    return (
        <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
          {choices.filter(choice => choice.color === selectedColor).map((choice, index) => (
            <React.Fragment key={index}>
              <a href="http://localhost:5173/timetable">
                <img src={choice.picture} alt={`Hotpick ${index + 1}`} />
              </a>
              <p className='font-semibold'>{name}</p>
              <p className='text-md font-semibold'>${choice.price}</p>
            </React.Fragment>
          ))}
          <div className='flex gap-2 mt-2'>
            {choices.map((choice, index) => (
              <React.Fragment key={index}>
                <input 
                  type="radio"
                  id={`choice-${index}`}
                  name="colorChoice"
                  value={choice.color}
                  className="hidden"
                  onChange={() => setSelectedColor(choice.color)}
                  checked={selectedColor === choice.color}
                />
                <label 
                  htmlFor={`choice-${index}`}
                  className={`w-6 h-6 rounded-full border-4 cursor-pointer`}
                  style={{
                    backgroundColor: choice.color, 
                    borderColor: selectedColor === choice.color ? '#333' : '#ccc'
                  }}
                ></label>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
}