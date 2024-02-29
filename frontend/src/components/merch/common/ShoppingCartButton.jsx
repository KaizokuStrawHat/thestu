import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import DialogFooter from "./DialogFooter";
import { ShoppingCart, Variable } from "lucide-react";
import ShoppingCartItems from "./ShoppingCartItems";
import { useEffect, useState } from "react";

export default function ShoppingCartButton({cartItems, addToCart}){
    useEffect(() => {
        const total = cartItems.reduce((acc, cartItem) => acc + cartItem.price, 0);
        setTotalAmount(total);
    }, [cartItems]);

    const [totalAmount, setTotalAmount] = useState(0);

    return(
        <Dialog> 
            <DialogTrigger asChild>
                <ShoppingCart className="w-full bg-blue-400 rounded h-12 mt-4" onClick={addToCart}/>
            </DialogTrigger>
            <DialogContent  className="flex flex-col w-[320px] h-full fixed left-[90.85%] bg-white p-0 gap-0">
                <DialogTitle className="pt-4 pl-4 pr-4">Your Shopping Cart</DialogTitle>
                <ShoppingCartItems cartItems={cartItems} />
                <DialogFooter totalAmount={totalAmount} />
            </DialogContent>
        </Dialog>
    )
}