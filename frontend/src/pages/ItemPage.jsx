import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import hotpick1 from '../assets/hotpick1.jpg';
import FiveStarsRating from "../components/merch/common/FiveStarsRating";
import QuantityButton from "../components/merch/common/QuantityButton";
import CartButton from "../components/merch/common/CartButton";
import ItemPageDetails from "../components/merch/common/ItemPageDetails";
import ItemPageOptions from "../components/merch/common/ItemPageOptions";
import ItemPageInfoLinks from "../components/merch/common/ItemPageInfoLinks";

import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// name
// rating
// price
// discount
// available sizes
// available colors
// available stock  
// scrolling up shows top navigation ( stick + hidden when scrolling down )


export default function ItemPage(){

    const { id } = useParams();

    // const fetchData = async () => {
    //     const response = await fetch(`http://localhost:5000/merch/itemPage/${id}`);
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // };

    // const getItemPageQuery = useQuery({
    //     queryKey: ['checkItemPageExists'], 
    //     queryFn: fetchData,
    // });

    // const { data: content, error } = getItemPageQuery;

    // if (getItemPageQuery.isLoading) return <div>Loading...</div>;
    // if (getItemPageQuery.isError) return <div>Error: {error.message}</div>;

    const [quantity, setQuantity] = useState(0)

    return (
        <div>

            <Dialog> 
                <DialogTrigger asChild>
                    <ShoppingCart className="bg-blue-400 rounded h-12"/>
                </DialogTrigger>
                <DialogOverlay className="relative">
                    <DialogContent className="w-[320px] h-full absolute bg-red-200 border-4 border-red-500">
                        <DialogHeader>
                            <DialogTitle>Your Shopping Cart</DialogTitle>
                            <DialogDescription>
                                
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        </div>
                        <div>
                            <h4>Coupon</h4>
                            <input type="text" />
                            <Button className='w-full' type="">Apply</Button>
                            <div className="flex items-center justify-between">
                                <h1 className="font-bold text-lg">Subtotal:</h1>
                                <h4>$99.99</h4>
                            </div>
                            <Button className='w-full' type="submit">Checkout</Button>
                        </div>
                    </DialogContent>
                </DialogOverlay>
            </Dialog>

            <div className="pt-10 px-10 pb-6 md:flex xl:w-[1280px] xl:h-[904px] ml-[auto] mr-[auto] ">
            {/* {content && JSON.stringify(content)} */}
                <img src={hotpick1} className="h-[60%] self-center md:w-[50%] md:pr-6 xl:h-[100%]"/>
                <div className="flex flex-col md:w-[50%] mt-2">
                    <FiveStarsRating />
                    {/* <Star fill="black" color="black"/> */}
                    <ItemPageDetails />
                    <ItemPageOptions />
                    <ItemPageInfoLinks />
                    <div className="flex flex-col justify-between mt-8 gap-4">
                        <QuantityButton quantity={quantity} setQuantity={setQuantity}/>
                        <CartButton />
                    </div>
                </div>
            </div>




            {/* 
                absolute made top and bottom decrease 
                right-0 made left increased 
            */}


            























        </div>
    );
};

/*

*/