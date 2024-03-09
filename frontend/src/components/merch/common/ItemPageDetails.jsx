export default function ItemPageDetails({itemName, selectedVariety}){
    return(
        <>
            <h1 className="font-semibold text-xl">{itemName}</h1>
            <h2 className="font-semibold">${selectedVariety.price}<span className="font-normal text-xs"> + Tax included. Shipping calculated at checkout.</span></h2>
        </>
    )
}