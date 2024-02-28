import React, { useEffect, useState } from "react";
import MerchHeader from "../components/merch/MerchHeader"
import MerchFooter from "../components/merch/MerchFooter"
import MerchNavigation from "../components/merch/MerchNavigation";
import MerchContent from "../components/merch/MerchContent";

export default function MerchLandingPage(){

    return(
        <div className="h-[87.5vh] w-screen bg-slate-100 flex justify-evenly gap-2">
            <div className="w-[50%]  bg-blue-200 flex justify-center items-center">
                <button className="p-2 bg-blue-300">
                    <a href="http://localhost:5173/merch/homepage-men"> MEN </a>
                </button>
            </div>
            <div className="w-[50%] bg-red-200 flex justify-center items-center">
                <button className="p-2 bg-red-300">
                    <a href="http://localhost:5173/merch/homepage-women"> WOMEN </a>
                </button>
            </div>

            {/* <MerchHeader/> */}
            {/* <MerchFooter /> */}
        </div>
    )
}