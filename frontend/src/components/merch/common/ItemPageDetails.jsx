export default function ItemPageDetails({name, selectedVariety}){
    return(
        <>
            <h1 className="font-semibold text-xl">{name}</h1>
            <h2 className="font-semibold">${selectedVariety.price}<span className="font-normal text-xs"> + Tax included. Shipping calculated at checkout.</span></h2>
        </>
    )
}