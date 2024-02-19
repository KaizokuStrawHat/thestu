import { ShoppingCart } from "lucide-react"

export default function CartButton(){
    return(
        <button className="bg-blue-400 rounded h-12">
            <ShoppingCart className="w-full " onClick={() => console.log('clicked')}/>
        </button>
    )
}