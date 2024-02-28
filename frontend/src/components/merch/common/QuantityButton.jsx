import { Minus, Plus } from 'lucide-react'
export default function QuantityButton({quantity, setQuantity}){
    return(
        <div className="flex justify-between px-6 border-2 border-gray-200 h-16">
            <button onClick={() => setQuantity(prevQuantity => prevQuantity - 1)} disabled={quantity === 1}><Minus/></button>
            <h1 className="ml-4 mr-4 mt-4 font-semibold text-xl">{quantity}</h1>
            <button onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}><Plus/></button>
        </div>
    )
}