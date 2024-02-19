export default function ItemPageOptions(){
    return(
        <>
            <div className="flex justify-between">
                <div className='flex gap-2 mt-2'>
                    <button className='w-8 h-8 rounded-full bg-slate-600 border-4 border-gray-200'></button>
                    <button className='w-8 h-8 rounded-full bg-yellow-600 border-4 border-gray-200'></button>
                </div>
                <div className='inline-flex gap-2 mt-2'>
                    <button className='w-8 h-8 rounded-full border-4 border-gray-200 text-sm flex justify-center items-center'>S</button>
                    <button className='w-8 h-8 rounded-full border-4 border-gray-200 text-sm flex justify-center items-center'>M</button>
                </div>
            </div>
        </>
        
    )
}