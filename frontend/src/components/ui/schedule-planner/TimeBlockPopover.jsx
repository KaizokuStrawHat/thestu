import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ComboBox from "../Combobox";
import axios from "axios";
import { UilUserPlus, UilClockThree,  UilBuilding } from '@iconscout/react-unicons'

// If user wants to edit an existing timeblock
export default function TimeBlockPopover(){
    return(
        <form className="inline-flex flex-col h-60 bg-green-100 p-4">
            <div className="flex">
                <p className="inline">Wednesday - November 02, 2023</p>
                <button className="bg-red-600 w-6 ml-auto mb-4">X</button>
            </div>
            <div className="inline-flex gap-4 ml-2 mb-4">
                <button className="bg-red-200 rounded p-2 w-[79.844px] h-[60px]">Drop-in</button>
                <button className="bg-red-200 rounded p-2 w-[79.844px]">Program</button>
                <button className="bg-red-200 rounded p-2">Workshop</button>
                <button className="bg-red-200 rounded p-2 w-[79.844px]">Rental</button>
            </div>
            <div className="flex mb-4 gap-2">
                <UilClockThree className='inline'/>
                <input type='text' className="bg-gray-200"/>
            </div>
            <div className="flex mb-4 gap-2">
                <UilBuilding className='inline'/>
                <input type='text' className="bg-gray-200"/>
            </div>
            <div className="flex mb-4 gap-2">
                <UilUserPlus className='inline'/>
                <input type='text' className="bg-gray-200"/>
            </div>
        </form>
    )
}

// time and day conflict logic
// same day and different time logic

// Add teacher textbox -- TeacherFields.jsx
// Question Mark logo -- tool tip hover -- "Create teacher profile first"
