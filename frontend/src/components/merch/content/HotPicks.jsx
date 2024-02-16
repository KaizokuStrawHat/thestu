import hotpick1 from '../../../assets/hotpick1.jpg'
import hotpick2 from '../../../assets/hotpick2.jpg'
import hotpick3 from '../../../assets/hotpick3.jpg'
import hotpick4 from '../../../assets/hotpick4.jpg'
import hotpick5 from '../../../assets/hotpick5.jpg'
import hotpick6 from '../../../assets/hotpick6.jpg'
import hotpick7 from '../../../assets/hotpick7.jpg'
import hotpick8 from '../../../assets/hotpick8.jpg'
import Item from '../common/Item'
import React from 'react';

export default function HotPicks(){
    // const ITEMS = [
    //     {
    //         id: '',
    //         name: "Plain Hoodie",
    //         varieties: [
    //             {
    //                 color: '#ffdd59',
    //                 picture: '',
    //                 price: 28.99,
    //                 sale_percentage: 20
    //             }, 
    //             {
    //                 color: '#ffdd59',
    //                 picture: '',
    //                 price: 34.99,
    //                 sale_percentage: 20
    //             }
    //         ]
    //     },
    //     {
    //         id: '',
    //         name: "Zip-up Jacket",
    //         varieties: [
    //             {
    //                 color: '#f2dd59',
    //                 picture: '',
    //                 price: 43.99,
    //                 sale_percentage: 30
    //             }, 
    //             {
    //                 color: '#f44d59',
    //                 picture: '',
    //                 price: 34.99,
    //                 sale_percentage: 30
    //             }
    //         ]
    //     }
    // ]

    const ItemCollection = [
        {
            name: 'Plain Hoodie',
            choices: [
                {
                    price: 34.99,
                    picture: hotpick1,
                    color: '#ffdd59',
                }, 
                {
                    price: 26.99,
                    picture: hotpick6,
                    color: '#e9efef',
                }
            ]
        },
        {
            name: 'Graphic Hoodie',
            choices: [
                {
                    price: 59.99,
                    picture: hotpick2,
                    color: '#e5d4da'
                }
            ]
        }
    ]
    
    return(
        <>
            {ItemCollection.map((item, index) => (
                <React.Fragment key={index}>
                    <Item name={item.name} choices={item.choices}/>
                </React.Fragment>
            ))}
            <div className='flex flex-col items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick3} alt='Hotpick 3' />
                <p className='text-md font-semibold'>Leather Jacket</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>
            <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick4} alt='Hotpick 4' />
                <p className='text-md font-semibold'>Graphic Hoodie</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>

            <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick5} alt='Hotpick 5' />
                <p className='text-md font-semibold'>Graphic Hoodie</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>
            <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick6} alt='Hotpick 6' />
                <p className='text-md font-semibold'>Graphic Hoodie</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>
            <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick7} alt='Hotpick 7' />
                <p className='text-md font-semibold'>Graphic Hoodie</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>
            <div className='flex flex-col flex-wrap items-center whitespace-nowrap'>
                <img className="bg-blue-200" src={hotpick8} alt='Hotpick 8' />
                <p className='text-md font-semibold'>Graphic Hoodie</p>
                <p className='text-md'>$59.99</p>
                <div className='flex gap-2 mt-2'>
                    <div className='w-6 h-6 rounded-full bg-slate-600 border-4 border-gray-200'></div>
                    <div className='w-6 h-6 rounded-full bg-yellow-600 border-4 border-gray-200'></div>
                </div>
            </div>
        </>
    )
}

// merch card component properties:
// link to the collection page
// id
// name
// price
// out of stock
// sizes
// color1_picture
// color2_picture