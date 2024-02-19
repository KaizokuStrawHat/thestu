import { Minus, Plus } from 'lucide-react'
export default function QuantityButton({quantity, setQuantity}){
    return(
        <div className="flex justify-between px-10 border-2 border-gray-200 h-16">
            <button className=" first-line:align-middle" onClick={() => setQuantity(quantity - 1)} disabled={quantity === 0}><Minus/></button>
            <h1 className="align-middle ml-4 mr-4 mt-4 font-semibold text-xl">{quantity}</h1>
            <button className="align-middle" onClick={() => setQuantity(quantity + 1)}><Plus/></button>
        </div>
    )
}