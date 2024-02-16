import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import hotpick1 from '../assets/hotpick1.jpg';
import FiveStarsRating from "../components/merch/common/FiveStarsRating";
import { Star, Ruler,  ShoppingCart } from 'lucide-react';
import QuantityButton from "../components/merch/common/QuantityButton";

export default function ItemPage(){
    const { id } = useParams();

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/merch/itemPage/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const getItemPageQuery = useQuery({
        queryKey: ['checkItemPageExists'], 
        queryFn: fetchData,
    });

    const { data: content, error } = getItemPageQuery;

    if (getItemPageQuery.isLoading) return <div>Loading...</div>;
    if (getItemPageQuery.isError) return <div>Error: {error.message}</div>;


    // name
    // rating
    // price
    // discount
    // available sizes
    // available colors
    // available stock  
    // scrolling up shows top navigation ( stick + hidden when scrolling down )

    return (
        <div className="pt-10 px-10">
            {/* {content && JSON.stringify(content)} */}
            <img src={hotpick1} className="h-[60%] self-center"/>
            <div className="mt-2">
                <FiveStarsRating />
                {/* <Star fill="black" color="black"/> */}

                <h1>Plain Hoodie</h1>
                <h2>$39.55 <span className="text-xs">+ Tax included. Shipping calculated at checkout.</span></h2>
                <div className='flex gap-2 mt-2'>
                    <div className='w-8 h-8 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-8 h-8 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='inline-flex gap-2 mt-2'>
                        <div className='w-8 h-8 rounded-full border-4 border-gray-200 text-sm flex justify-center items-center'>S</div>
                        <div className='w-8 h-8 rounded-full border-4 border-gray-200 text-sm flex justify-center items-center'>M</div>
                    </div>
                    <div className="flex items-center justify-center gap-2 border-2 p-[0.25rem]">
                        <a href='#' className="text-md">Size Charts</a>
                        <Ruler />
                    </div>
                </div>
                <div className="inline">
                    <QuantityButton/>
                    <button className="align-middle ml-[auto]">
                        <ShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    );
};