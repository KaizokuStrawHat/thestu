import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, addDays } from 'date-fns';

export default function ConfirmationFormsLayout({ formData, setFormData, setPhase, isOvernight }){
    const [doesConflictExist, setDoesConflictExist] = useState(false)
    const [conflictArray, setConflictArray] = useState([])
    const [successArray, setSuccessArray] = useState([])

    // const [testData, setTestData] = useState({
    //     categoryRadio: 'Drop-In',
    //     levelRadio: 'Intermediate',
    //     studioTextbox: 'Studio C',
    //     teacherTextbox1: 'Emilio',
    //     startTimeTextbox: '5:30 PM',
    //     endTimeTextbox: '4:00 PM',
    //     schedulesArray: [   
    //         {date: '2023-12-27', status: ''}, {date: '2023-12-30', status: ''}
    //     ]
    // })

    const renderDateItem = (schedule, isOvernight) => {
        const date = new Date(schedule.date);
        if (isOvernight) {
            return `${format(addDays(date, 1), 'MMMM d, yyyy')} - ${format(addDays(date, 2), 'MMMM d, yyyy')}`;
        } else {
            return format(addDays(date, 1), 'MMMM d, yyyy');
        }
    };

    // works smoothly if once I integrate 'if overnight - split into two timeslot' logic 

    // console.log(isOvernight)

    const handleSubmit = async () => {
        console.log('it click')
        // try {
        //   const response = await axios.post('http://localhost:5000/timetable/testing-post', formData);
        //   console.log('Response from server:', response.data);
        // } catch (error) {
        //   console.error('Error:', error);
        // }
        // setPhase(0)
    }

    useEffect(() => {
        const validateDates = async () => {
            try {
                const validatedDates = await axios.post('http://localhost:5000/timetable/testing-post2', formData);

                setConflictArray(validatedDates.data.filter(obj => obj.status === 'CONFLICT'))
                setSuccessArray(validatedDates.data.filter(obj => obj.status === 'SUCCESS'))
                
                if (validatedDates.data.filter(obj => obj.status === 'CONFLICT').length != 0)
                    setDoesConflictExist(true);

            } catch (error) {
                console.error('Error:', error);
            }
        }
        validateDates()
    }, [])

    useEffect(() => {
        console.log('isOvernight:', isOvernight)
    }, [formData, conflictArray, successArray])

    useEffect(() => {
        setFormData({
            ...formData,
            schedulesArray: successArray.map(item => (item.date))
        });
    }, [successArray])

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
                    <div className="flex flex-col w-[65%] border-4 border-gray-300 p-2">
                        <div className="w-[2/3] h-[30rem] flex flex-col overflow-auto">
                            <div className="flex">
                                <div className="flex flex-col w-[50%]">
                                    <div className="text-center bg-yellow-600 text-white font-bold">Dates</div>
                                    {[...conflictArray, ...successArray].map((schedule, index) => (
                                        <div className="flex w-full justify-center text-center" key={schedule.id || index}>
                                            <div className="text-center">{renderDateItem(schedule, isOvernight)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <div className="text-center bg-yellow-600 text-white font-bold">Status</div>
                                    {[...conflictArray, ...successArray].map((schedule, index) => (
                                        <div className={`text-center flex w-full justify-center ${schedule.status === 'CONFLICT' ? 'text-red-600' : 'text-green-600'}`} key={schedule.id || index}>
                                            {schedule.status}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {doesConflictExist &&
                        <div className="w-[1/3] text-red-500 text-center font-bold">
                            Submitting will ignore dates with conflict status.
                        </div>}
                    </div> 
                </div>
                <div className="flex gap-4 mt-2 justify-end">
                    <button className='bg-green-600 text-white p-4 rounded' onClick={() => handleSubmit()}>SUBMIT</button>
                </div>
            </div> 
        </div>
    )
}