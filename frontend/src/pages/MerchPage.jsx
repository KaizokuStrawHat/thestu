import React, { useEffect, useState } from "react";
import MerchHeader from "../components/merch/MerchHeader"
import MerchFooter from "../components/merch/MerchFooter"
import MerchNavigation from "../components/merch/MerchNavigation";
import MerchContent from "../components/merch/MerchContent";

export default function MerchPage(){
    const [NavigationValue, setNavigationValue] = useState(0)

    return(
        <div className="h-full w-full">
            <MerchHeader NavigationValue={NavigationValue}/>
            <MerchNavigation setNavigationValue={setNavigationValue} />
            <MerchContent NavigationValue={NavigationValue} />
            {/* <MerchHeader/> */}
            
            {/* <MerchFooter /> */}
        </div>
    )
}