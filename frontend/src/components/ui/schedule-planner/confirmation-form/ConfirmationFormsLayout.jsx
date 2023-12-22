import React from "react";
import axios from "axios";
import { format, addDays } from 'date-fns';

export default function ConfirmationFormsLayout({ formData, setPhase, isOvernight }){

    // const testData = {
    //     categoryRadio: 'Drop-In',
    //     levelRadio: 'Intermediate',
    //     studioTextbox: 'Studio C',
    //     teacherTextbox1: 'Emilio',
    //     startTimeTextbox: '5:00 PM',
    //     endTimeTextbox: '6:00 PM',
    //     datesArray: [   
    //     ]
    // }
    console.log(isOvernight)

    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:5000/timetable/testing-post', formData);
          console.log('Response from server:', response.data);
          setPhase(0)
        }  catch (error) {
          console.error('Error:', error);
        }
    }

    return(
        <div className="flex w-full justify-center items-center mb-4">
            <div className="w-[60%] mt-4">
                <div className="flex">
                    <div className='w-[35%] grid grid-cols-3 grid-rows-3 gap-y-8 gap-x-20 p-6 rounded bg-yellow-700  text-white'> 
                            <h1 className="flex flex-col">
                                <span className="font-bold">Category: </span>
                                <span>{formData.categoryRadio} </span>
                            </h1>
                            <h1 className="flex flex-col">
                                <span className="font-bold">Level: </span> 
                                <span>{formData.levelRadio}</span>
                            </h1>
                            <h1 className="flex flex-col">
                                <span className="font-bold">Studio: </span> 
                                <span>{formData.studioTextbox}</span>
                            </h1>
                            <h1 className="flex flex-col whitespace-nowrap">
                                <span className="font-bold">Start Time: </span>
                                <span>{formData.startTimeTextbox}</span>
                            </h1>
                            <h1 className="flex flex-col whitespace-nowrap">
                                <span className="font-bold">End Time: </span>
                                <span>{formData.endTimeTextbox}</span>
                            </h1>
                    </div> 
                    <div className="w-[65%] h-[30rem] flex flex-col overflow-auto border-4 border-gray-300 p-6">
                        {/* if conflict exists */}
                        <div className="flex w-full">
                            <div className="text-center bg-red-500 text-white font-bold p-4"> CONFLICT </div>
                        </div>
                        <div className="flex w-full">
                            <div className="flex flex-col w-[50%]">
                                <div className="text-center bg-yellow-600 text-white font-bold"> Dates </div>
                                {formData.datesArray.map((schedule, index) => {
                                    return (
                                    <div className="flex w-full justify-center text-center" key={index}>
                                        {(isOvernight) ? (
                                            <div className="text-center">{`${format(addDays(new Date(schedule), 1), 'MMMM d, yyyy')}`}</div>
                                        ) : (!isOvernight) ? (
                                            <div className="text-center">{`${format(addDays(new Date(schedule), 1), 'MMMM d, yyyy')} - ${format(addDays(new Date(schedule), 2), 'MMMM d, yyyy')}`}</div>
                                        ) : null}
                                    </div>
                                )})}
                            </div>
                            <div className="flex flex-col w-[50%]">
                                <div className="text-center bg-yellow-600 text-white font-bold"> Status </div>
                                {formData.datesArray.map((__, index) => {
                                    return <div className="text-center flex w-full justify-center" key={index}>Pending...</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-2 justify-end">
                    <button className="bg-green-600 p-4 rounded text-white" onClick={() => handleSubmit()}>SUBMIT</button>
                </div>
            </div> 
        </div>
    )
}