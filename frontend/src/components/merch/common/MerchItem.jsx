import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorButtons from './ColorButtons';

export default function MerchItem({itemName, varieties, id}){
  const [selectedColor, setSelectedColor] = useState(varieties[0].color)

// 

  // Receive user selections from MerchContent.jsx 
  const navigate = useNavigate();
  const goToItemPage = () => {
    navigate(`/merch/item/${id}`, { 
      state: { 
        id: id,
        itemName: itemName,
        userColor: selectedColor,
        varieties: varieties,
      } 
    });
  }

  const colors = varieties.map(variety => variety.color)
    
  return (
      <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
        {varieties
        .filter(variation => variation.color === selectedColor)
        .map((variation, index) => (
          <React.Fragment key={index}>
            <button onClick={goToItemPage}>
              <img src={variation.picture} alt={`Hotpick ${index + 1}`} />
            </button>
            <p className='font-semibold'>{itemName}</p>
            <p className='text-md font-semibold'>${variation.price}</p>
          </React.Fragment>
        ))}
        <div className='flex gap-2 mt-2'>
          <ColorButtons colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        </div>
      </div>
    );
}