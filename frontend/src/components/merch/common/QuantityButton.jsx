import { Minus, Plus } from 'lucide-react'
export default function QuantityButton(){
    return(
        <div className="inline-block border-2 border-gray-200 mt-8">
            <button className="inline-block align-middle"><Minus/></button>
            <h1 className="inline-block align-middle ml-4 mr-4 font-semibold">0</h1>
            <button className="inline-block align-middle"><Plus/></button>
        </div>
    )
}