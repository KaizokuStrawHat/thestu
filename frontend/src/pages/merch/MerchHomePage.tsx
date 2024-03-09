import MerchContent from "../../components/merch/MerchContent";
import MerchNavigation from "../../components/merch/MerchNavigation";
import MerchHeader from "../../components/merch/MerchHeader";
import { useState } from "react"

export default function MerchHomePage(){
    
    const [NavigationValue, setNavigationValue] = useState(0)

    return(
        <>
            <MerchHeader NavigationValue={NavigationValue}/>
            <MerchNavigation setNavigationValue={setNavigationValue} />
            <MerchContent NavigationValue={NavigationValue} /> 
        </>
    )
}