import { PencilRuler, Truck, RotateCcw } from "lucide-react"

export default function ItemPageInfoLinks () {
    return(
        <div className="flex justify-between mt-8 mb-4">
            <a href='#' className="inline gap-2 p-[0.25rem] hover:underline text-md">
                Size Charts
                <PencilRuler className="inline ml-2"/>
            </a>    
            <a href='#' className="inline gap-2 p-[0.25rem] hover:underline text-md">
                Shipping Details
                <Truck className="inline ml-2"/>
            </a>
            <a href='#' className="inline gap-2 p-[0.25rem] hover:underline text-md">
                Return Policy
                <RotateCcw className="inline ml-2"/>
            </a>
        </div>
    )
}