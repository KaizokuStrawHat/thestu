export default function Item({name, price, picture1, color1, color2 }){
    return(
        <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
            <img className="bg-blue-200" src={picture1} alt='Hotpick 1' />
            <p className='text-md font-semibold'>{name}</p>
            <p className='text-md inline'>{price}</p>
            <div className='flex gap-2 mt-2'>
                <div className={`w-6 h-6 rounded-full bg-[${color1}] border-4 border-gray-500`}></div>
                <div className={`w-6 h-6 rounded-full bg-[${color2}] border-4 border-gray-500`}></div>
            </div>
        </div>
    )
}
// Plain Hoodie
// $34.99
