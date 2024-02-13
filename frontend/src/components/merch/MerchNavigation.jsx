export default function MerchNavigation({setNavigationValue}) {
    return(
        <div className="w-screen flex flex-wrap max-[938px]:gap-4 gap-12 p-4 pl-6 justify-center whitespace-nowrap">
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(0)}>Hot Picks</button>
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(1)}>Hoodie</button> 
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(2)}>Jacket</button> 
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(3)}>Sweater</button>
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(4)}>Shirt</button>
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(5)}>Polo Shirt</button>
            <button className="hover:bg-yellow-600 hover:text-white text-xl rounded-lg border-4 hover:border-yellow-600 p-2" onClick={() => setNavigationValue(6)}>Pants</button>
        </div>
    )
}

// SHIRT -- oversized and normal-sized