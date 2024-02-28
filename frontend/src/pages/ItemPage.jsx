import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import Rating from "../components/merch/common/Rating";
import QuantityButton from "../components/merch/common/QuantityButton";
import ItemPageDetails from "../components/merch/common/ItemPageDetails";
import ItemPageOptions from "../components/merch/common/ItemPageOptions";
import ItemPageInfoLinks from "../components/merch/common/ItemPageInfoLinks";
import ShoppingCartButton from '../components/merch/common/ShoppingCartButton';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Size } from "../components/merch/common/Size";
import { useLocation } from 'react-router-dom';
import GalleryElements from "../components/merch/common/GalleryElements";

function checkItemInventory() {
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
}


export default function ItemPage(){
//  Fetching useNavigation values from MerchItem.jsx
    const location = useLocation();
    const { id, name, varieties, userColor} = location.state || {};
    
//  Managing useNavigation values from MerchItem.jsx
    const colors = varieties.map(variety => variety.color)

//
    const [selectedColor, setSelectedColor] = useState(userColor);
    const [sizeValue, setSizeValue] = useState("")
    const [quantity, setQuantity] = useState(1);
    const selectedVariety = varieties.filter(variety => variety.color === selectedColor)[0];
    /*
        selectedVariety = {
            price: 34.99,
            picture: hotpick1,
            color: '#ffdd59',
        }
    */
//
    const [ImageValue, setImageValue] = useState(selectedVariety.picture);   
//

    useEffect(() => {
        console.log('selectedVariety:', selectedVariety)
    }, [selectedVariety])

    /*
        ItemPageDetails.jsx:
        varieties.filter(variety => variety.color === selectedColor).map((item, index) => (
            <h2 className="font-semibold">${item.price}<span className="font-normal text-xs"> + Tax included. Shipping calculated at checkout.</span></h2>
        ))
        price


        ItemPageOptions.jsx:
        varieties.filter(item => item.color === selectedColor).map(item => item.picture)
        picture

        <img/>                  changes based on ImageValue        
        ImageValue              changes based on GalleryElement    (logic located: GalleryElements.jsx)
        ImageValue              changes based on selectedColor     (logic located: ItemPageOptions.jsx)
        Price                   changes based on selectedColor     (logic located: ItemDetails.jsx)
        
        NOT IMPLEMENTED YET
        SelectedGallery         changes based on selectedColor     (logic located: GalleryElements.jsx)

        
        We need to pass ImageValue, price, size, color, quantity to shopping cart
    */

    
    // const pendingCartValue =
    // const Cart = []

    return (
        <div>
            <div className="pt-10 px-10 pb-6 md:flex xl:w-[1280px] xl:h-[904px] ml-[auto] mr-[auto]">
                <img src={ImageValue} className="h-[60%] self-center md:w-[50%] md:pr-6 xl:h-[100%]" alt={`${ImageValue.color} Item`} />
                <div className="flex flex-col md:w-[50%] mt-2 justify-between">
                    <div>
                        <Rating />
                        {/* <Star fill="black" color="black"/> */}
                        <ItemPageDetails 
                            name={name} 
                            selectedVariety={selectedVariety}   
                        />
                        <ItemPageOptions 
                            colors={colors} 
                            selectedColor={selectedColor} 
                            setSelectedColor={setSelectedColor} 
                            setImageValue={setImageValue}
                            selectedVariety={selectedVariety}
                            sizeValue={sizeValue} setSizeValue={setSizeValue}
                            sizes={selectedVariety.sizes}
                        />
                    </div>
                    <div className="mb-40">
                        <ItemPageInfoLinks />     
                        <GalleryElements 
                        varieties={varieties} 
                        ImageValue={ImageValue} 
                        setImageValue={setImageValue}
                        />
                        <QuantityButton 
                        quantity={quantity} 
                        setQuantity={setQuantity}
                        />
                        <button onClick={() => console.log(
                            {
                                itemId: id,
                                color: selectedColor, 
                                size: sizeValue, 
                                quantity: quantity, 
                            }
                        )}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};