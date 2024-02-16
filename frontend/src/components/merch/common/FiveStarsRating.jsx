import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import '../../../styles/index.css'
  
export default function FiveStarsRating() {
    return(
        <div className='mb-2'>
            <StarRatings
            rating={2.303}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="gray"
            starHoverColor="yellow"
            />
            <p className='inline '>{'(2)'}</p>
        </div>
    )
}