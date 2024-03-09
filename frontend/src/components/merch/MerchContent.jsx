import React, { useEffect } from 'react'
import '../../styles/index.css'
import HotPicks from './content/HotPicks'
import Hoodie from './content/Hoodie'
import Jacket from './content/Jacket'
import Sweater from './content/Sweater'
import Shirt from './content/Shirt'
import PoloShirt from './content/PoloShirt'
import Accessories from './content/Accessories'

export default function MerchContent ({NavigationValue}) {
    return(
    <div className="merch-content-grid min-[750px]:grid-cols-4 overflow-hidden gap-x-8 gap-y-12 pb-60 pt-10 pl-10 pr-10">
        {(NavigationValue === 0) ? (
            <HotPicks />
        ) : (NavigationValue === 1) ? (
            <Hoodie />
        ) : (NavigationValue === 2) ? (
            <Jacket />
        ) : (NavigationValue === 3) ? (
            <Sweater />
        ) : (NavigationValue === 4) ? (
            <Shirt />
        ) : (NavigationValue === 5) ?   (
            <PoloShirt />
        ) : (NavigationValue === 6) ? (
            <Pants />
        ) : (NavigationValue === 7) ? (
            <Accessories />
        ) : null}
    </div>)
}