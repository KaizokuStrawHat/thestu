import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, addDays } from 'date-fns';

export default function ConfirmationFormsLayout({ setPhase }){

    let isOvernight = true;
    const [formData, setFormData] = useState({
        categoryRadio: 'Drop-In',
        levelRadio: 'Intermediate',
        studioTextbox: 'Studio C',
        teacherTextbox1: 'Emilio',
        startTimeTextbox: '6:00 PM',
        endTimeTextbox: '5:59 PM',
        schedulesArray: [   
            { date: '2023-12-26'}, { date: '2023-12-29'}
        ]
    })

    const [doesConflictExist, setDoesConflictExist] = useState(false);

    const postData = async (pendingData) => {
        try {
            console.log('This is what you are trying to submit: ', pendingData)
            const response = await axios.post('http://localhost:5000/confirmation/postNewClass', pendingData);
            console.log('Response from server:', response.data);
        } catch (error) {
          console.error('Error:', error);
        };
    };

    // On mount, post the current user's formData to have the server return validatedDates going through checkTimeConflict()
    useEffect(() => {
        const validateDates = async (data) => {
            try {
                const validatedSchedules = await axios.post('http://localhost:5000/confirmation/checkTimeConflict', data);

                // Sorting
                let sortedValidatedSchedules = validatedSchedules.data.sort((a, b) => {
                    if (a.status === b. status){
                        return 0;
                    } else if (a.status === "SUCCESSFUL") {
                        return -1;
                    } else {
                        return 1;
                    }
                });
            
                // Setting data for rendering and posting
                setFormData({
                    ...formData,
                    schedulesArray: sortedValidatedSchedules
                });

                // If conflict is detected, conditional rendering of <p> "Submitting will ignore dates with conflict status" </p>
                if (validatedSchedules.data.filter(obj => obj.status === 'CONFLICT').length != 0)
                    setDoesConflictExist(true);
            } catch (error) {
                console.error('Error:', error);
            };
        };

        if (isOvernight) {
            const currentDay = {
                ...formData,
                endTimeTextbox: '11:59 PM'
            }
            const overNight = {
                ...formData,
                startTimeTextbox: '12:00 AM',
                schedulesArray: formData.schedulesArray.map((schedule, index) => {
                    return { date: format(addDays(new Date(schedule.date), 2), 'yyyy-MM-dd')}
                })
            }
            validateDates([currentDay, overNight]);
        } else {
            validateDates([formData])
        }
    }, []);

    const handleSubmit = () => {
        // Create an array with items that has value of SUCCESS
        const successArray = formData.schedulesArray.filter(item => item.status === 'SUCCESS')

        // Remove status property, it is no longer needed.
        const reformedArray = successArray.map(item => {
            delete item.status;
            return item
        })

        // Initialize a placeholder
        let pendingArray = []

        // Simplifies overnight detection, using length() function in /postNewClass
        // If overnight, submit an array with two arrays
        if (isOvernight) {
            const reformedArray2 = reformedArray.map((schedule) => ({ 
                date: format(addDays(new Date(schedule.date), 2), 'yyyy-MM-dd') 
            }))
            pendingArray = [reformedArray, reformedArray2]
        } 
        // If not, submit an array with one array
        else {
            pendingArray = [reformedArray];
        }

        const pendingData = {
            ...formData,
            schedulesArray: pendingArray,
            isOvernight: isOvernight
        }
        postData(pendingData)

        // setPhase(0)
    };

    // For increased readability
    const renderDateItem = (schedule, isOvernight) => {
        const date = new Date(schedule.date);
        if (isOvernight) {
            return `${format(addDays(date, 1), 'MMMM d, yyyy')} - ${format(addDays(date, 2), 'MMMM d, yyyy')}`;
        } else {
            return format(addDays(date, 1), 'MMMM d, yyyy');
        }
    };

    useEffect(() => {
        console.log(formData)
    }, [formData])

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
                                    {formData.schedulesArray.map((schedule, index) => (
                                        <div className="flex w-full justify-center text-center" key={schedule.id || index}>
                                            <div className="text-center">{renderDateItem(schedule, isOvernight)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <div className="text-center bg-yellow-600 text-white font-bold">Status</div>
                                    {formData.schedulesArray.map((schedule, index) => (
                                        <div className={`text-center flex w-full justify-center ${schedule.status === 'CONFLICT' ? 'text-red-600' : 'text-green-600'}`} key={schedule.id || index}>
                                            {schedule.status}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {doesConflictExist &&
                        <p className="w-[1/3] text-red-500 text-center font-bold">
                            Submitting will ignore dates with conflict status.
                        </p>}
                    </div> 
                </div>
                <div className="flex gap-4 mt-2 justify-end">
                    <button className='bg-green-600 text-white p-4 rounded' onClick={() => handleSubmit()}>SUBMIT</button>
                </div>
            </div> 
        </div>
    )
}