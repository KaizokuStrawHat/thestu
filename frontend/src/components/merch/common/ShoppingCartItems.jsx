import { 
    Trash,
    Pencil,
    Minus,
    Plus
} from 'lucide-react';
import hotpick1 from '../../../assets/hotpick1.jpg';

export default function ShoppingCartItems({variant, setVariant}){
    return(
        <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-[75%] bg-gray-100 mt-4">
            <div className="flex">
                <img src={hotpick1} className="w-[145px] h-[180px] ml-2 md:pr-6 inline"/>
                <div className="flex-inline">
                    <h1>Plain Hoodie</h1>
                    <h2>Black / M </h2>
                    <h3>$39.55</h3>
                    <div className="mt-2 mb-4 h-12 w-[140px] flex justify-between px-2 border-2 border-gray-200 ">
                        {/* <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity - 1}))} disabled={variant === 1}>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{variant.quantity}</h1>
                        <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity + 1}))}>
                            <Plus/>
                        </button> */}
                        <button>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">1</h1>
                        <button>
                            <Plus/>
                        </button>
                    </div>
                    <div className="mx-2 justify-between flex">
                        <Trash />
                        <Pencil />
                    </div>
                </div>
            </div>
            <div className="flex">
                <img src={hotpick1} className="w-[145px] h-[180px] ml-2 md:pr-6 inline"/>
                <div className="flex-inline">
                    <h1>Plain Hoodie</h1>
                    <h2>Black / M </h2>
                    <h3>$39.55</h3>
                    <div className="mt-2 mb-4 h-12 w-[140px] flex justify-between px-2 border-2 border-gray-200 ">
                        {/* <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity - 1}))} disabled={variant === 1}>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{variant.quantity}</h1>
                        <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity + 1}))}>
                            <Plus/>
                        </button> */}
                        <button>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">1</h1>
                        <button>
                            <Plus/>
                        </button>
                    </div>
                    <div className="mx-2 justify-between flex">
                        <Trash />
                        <Pencil />
                    </div>
                </div>
            </div>
            <div className="flex">
                <img src={hotpick1} className="w-[145px] h-[180px] ml-2 md:pr-6 inline"/>
                <div className="flex-inline">
                    <h1>Plain Hoodie</h1>
                    <h2>Black / M </h2>
                    <h3>$39.55</h3>
                    <div className="mt-2 mb-4 h-12 w-[140px] flex justify-between px-2 border-2 border-gray-200 ">
                        {/* <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity - 1}))} disabled={variant === 1}>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{variant.quantity}</h1>
                        <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity + 1}))}>
                            <Plus/>
                        </button> */}
                        <button>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">1</h1>
                        <button>
                            <Plus/>
                        </button>
                    </div>
                    <div className="mx-2 justify-between flex">
                        <Trash />
                        <Pencil />
                    </div>
                </div>
            </div>
            <div className="flex">
                <img src={hotpick1} className="w-[145px] h-[180px] ml-2 md:pr-6 inline"/>
                <div className="flex-inline">
                    <h1>Plain Hoodie</h1>
                    <h2>Black / M </h2>
                    <h3>$39.55</h3>
                    <div className="mt-2 mb-4 h-12 w-[140px] flex justify-between px-2 border-2 border-gray-200 ">
                        {/* <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity - 1}))} disabled={variant === 1}>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">{variant.quantity}</h1>
                        <button onClick={() => setVariant(prevVariant => ({...prevVariant, quantity: prevVariant.quantity + 1}))}>
                            <Plus/>
                        </button> */}
                        <button>
                            <Minus/>
                        </button>
                        <h1 className="ml-4 mr-4 mt-2 font-semibold text-xl">1</h1>
                        <button>
                            <Plus/>
                        </button>
                    </div>
                    <div className="mx-2 justify-between flex">
                        <Trash />
                        <Pencil />
                    </div>
                </div>
            </div>
        </div>
    )
}