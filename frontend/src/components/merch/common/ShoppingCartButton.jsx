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

export default function ShoppingCartButton(){
    return(
        <Dialog> 
            <DialogTrigger asChild>
                <button className="bg-blue-400 rounded h-12 w-[100%] mt-4">
                    <ShoppingCart className="w-full" />
                </button>
            </DialogTrigger>
            <DialogContent  className="flex flex-col w-[320px] h-full fixed left-[90.85%] bg-white p-0 gap-0">
                <DialogTitle className="pt-4 pl-4 pr-4">Your Shopping Cart</DialogTitle>
                {/* <ShoppingCartItem variant={variant} setVariant={setVariant} /> */}
                <ShoppingCartItems />
                <DialogFooter />
            </DialogContent>
        </Dialog>
    )
}