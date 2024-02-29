import { 
    Trash,
    Pencil,
    Minus,
    Plus
} from 'lucide-react';
import { useEffect } from 'react';

export default function ShoppingCartItems({cartItems}){
    /*
        {
            "itemId": "THESTU001-YELLOW",
            "picture": "/src/assets/hotpick1.jpg",
            "price": 34.99,
            "name": "Plain Hoodie",
            "colorName": "Yellow",
            "size": "XS",
            "quantity": 5
        }
    */
    return(
        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[75%] bg-gray-100 mt-4">
            {cartItems.map((cartItem) => (
                <div className="flex" key={cartItem.itemId}>
                    <img src={cartItem.picture} className="w-[145px] h-[180px] ml-2 md:pr-6 inline"/>
                    <div className="flex-inline">
                        <h1>{cartItem.name}</h1>
                        <h2>{`${cartItem.colorName} / ${cartItem.size}`}</h2>
                        <h3>{`$${cartItem.price}`}</h3>
                        <div className="mt-2 mb-4 h-12 w-[140px] flex justify-between px-2 border-2 border-gray-200 ">
                            {/* <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity - 1}))} disabled={variant === 1}>
                                <Minus/>
                            </button>
                            <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{variant.quantity}</h1>
                            <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity + 1}))}>
                                <Plus/>
                            </button> */}
                            <button>
                                <Minus/>
                            </button>
                            <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{cartItem.quantity}</h1>
                            <button>
                                <Plus/>
                            </button>
                        </div>
                        <div className="mx-2 justify-between flex">
                            <Trash />
                            <Pencil />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}