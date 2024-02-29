import { Button } from "@/components/ui/button";
 
export default function DialogFooter({totalAmount}){
    return(
        <div className="mt-2">
            <div className="flex justify-between items-center px-4">
                <h4>Coupon</h4>
                <input type="text" className="border-2 border-gray-200 w-28"/>
                <Button className='w-16 h-8 mr-2 border-gray-300 border-2'>Apply</Button>
            </div>
            <div className="flex justify-between items-center px-4">
                <h1 className="font-bold text-lg">Subtotal:</h1>
                <h4 className="font-bold text-lg">{`$${totalAmount}`}</h4>
            </div>
            <Button className='flex w-[90%] ml-auto mr-auto h-16 border-2'>Checkout</Button>
        </div>
    )   
}