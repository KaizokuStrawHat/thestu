import hotpick1 from '../../../assets/hotpick1.jpg'
import hotpick2 from '../../../assets/hotpick2.jpg'
import hotpick3 from '../../../assets/hotpick3.jpg'
import hotpick4 from '../../../assets/hotpick4.jpg'
import hotpick5 from '../../../assets/hotpick5.jpg'
import hotpick6 from '../../../assets/hotpick6.jpg'
import hotpick7 from '../../../assets/hotpick7.jpg'
import hotpick8 from '../../../assets/hotpick8.jpg'
import hotpick9 from '../../../assets/hotpick9.jpg'
import hotpick10 from '../../../assets/hotpick10.jpg'
import MerchItem from '../common/MerchItem'
import React from 'react';

export default function HotPicks(){

    const ItemCollection = [
        {
            id: 'THESTU001',
            name: 'Plain Hoodie',
            varieties: [
                {
                    id: 'THESTU001-YELLOW',
                    price: 34.99,
                    picture: hotpick1,
                    color: '#ffdd59',
                    sizes: [
                        'XS', 'S', 'M'
                    ]
                }, 
                {
                    id: 'THESTU001-WHITE',
                    price: 26.99,
                    picture: hotpick6,
                    color: '#e9efef',
                    sizes: [
                        'M', 'L', 'XL'
                    ]
                },
                {
                    id: 'THESTU001-BLACK',
                    price: 39.99,
                    picture: hotpick8,
                    color: '#2f251b',
                    sizes: [
                        'M', 'L'
                    ]
                }
            ]
        },
        {
            id: 'THESTU002',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick2,
                    color: '#e5d4da'
                }
            ]
        },
        {
            id: 'THESTU003',
            name: 'Leather Jacket',
            varieties: [
                {
                    price: 79.99,
                    picture: hotpick3,
                    color: '#c4cbd1'
                }
            ]
        },
        {
            id: 'THESTU004',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick4,
                    color: 'black'
                }
            ]
        },
        {
            id: 'THESTU005',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick5,
                    color: 'black'
                }
            ]
        },
        {
            id: 'THESTU006',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick7,
                    color: 'black'
                }
            ]
        },
        {
            id: 'THESTU007',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick9,
                    color: 'black'
                }
            ]
        },
        {
            id: 'THESTU008',
            name: 'Graphic Hoodie',
            varieties: [
                {
                    price: 59.99,
                    picture: hotpick10,
                    color: 'black'
                }
            ]
        }
    ]
     
    return(
        <>
            {ItemCollection.map((item, index) => (
                <React.Fragment key={index}>
                    <MerchItem name={item.name} varieties={item.varieties} id={item.id}/>
                </React.Fragment>
            ))}
        </>
    )
}
