import ClassForm from "./ClassForm";
import { useEffect, useState, useRef } from 'react';
import { format, parse } from 'date-fns';

export default function AddClassFormLayout({setPhase, setFormData, formData, setSelectedDates, setIsOvernight}){
    const [errors, setErrors] = useState({});
    const [canSubmit, setCanSubmit] = useState(false)
    const didComponentMount = useRef(0) // In production, initialize this AND the useEffect condition to 1
    const [isStartTimeValid, setIsStartTimeValid] = useState(null)
    const [isEndTimeValid, setIsEndTimeValid] = useState(null)
    const [isSameTime, setIsSameTime] = useState(null)
    let startTimeFormatFlag = null
    let endTimeFormatFlag = null
    let hasError = null

    function validateTimeFormat(value) {
        // Input must be h:mm a 
        try {
            const expectedFormat = 'h:mm a'
            const parsedDate = parse(value, expectedFormat, new Date())
            return format(parsedDate, expectedFormat) === value;
        } catch (error) {
            return false
        }
    }
    
    function convertTimeIntoInteger(dateString) {
        try {
            const parsedTime = parse(dateString, 'hh:mm a', new Date());
            const hours = parsedTime.getHours();
            const minutes = parsedTime.getMinutes();
            let militaryTimeInteger = hours * 100 + minutes;
            return militaryTimeInteger;
        } catch (error) {
            console.log(error)
        }
    }

    function validateFilled(value) {
        return value.trim() !== ''; 
    }

    function validateExistence(value, name) {
        // validate for teacher and studio, if that exists in the database
    }

    function isOvernight(startTime, endTime){
        try {
            return convertTimeIntoInteger(endTime) - convertTimeIntoInteger(startTime) < 0 
        } catch (error) {
            return false
        }
    }
    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    useEffect(() => {
        setIsSameTime(formData.startTime === formData.endTime)
    }, [formData])
    useEffect(() => {
        console.log(isSameTime)
    }, [isSameTime])

    function handleCancel(){
        setFormData({
            category: '',
            level: '',
            startTime: '',
            endTime: '',
            studio: '',
            teacher: ''
          })
        setSelectedDates([])
        setPhase(0)
    }

    function handleConfirm(e){
        e.preventDefault();
        for (const [name, value] of Object.entries(formData)) {
            let isValid = validateFilled(value)
            if (name === 'startTime') {
                // Validating format to 'hh:mm a' to ensure convertMilitaryTime function in timetableRoutes.js works as intended
                startTimeFormatFlag = validateTimeFormat(value)
                setIsStartTimeValid(startTimeFormatFlag)
            }
            else if (name === 'endTime') {
                // Validating format to 'hh:mm a' to ensure convertMilitaryTime function in timetableRoutes.js works as intended
                endTimeFormatFlag = validateTimeFormat(value)
                setIsEndTimeValid(endTimeFormatFlag)
            }
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: !isValid
            }))
        };

        hasError = !Object.values(errors).some(error => error === true);
        setIsOvernight(isOvernight(formData.startTime, formData.endTime))

        if (hasError && startTimeFormatFlag && endTimeFormatFlag && !isSameTime)
            setCanSubmit(true)
        else if (!hasError || !startTimeFormatFlag || !endTimeFormatFlag || isSameTime)
            setCanSubmit(false)
    }

    useEffect(() => {
        // didComponentMount exists for REACT STRICT MODE
        if (didComponentMount.current === 2) {
            if (canSubmit) {
                setPhase(2)
            } 
        }
        else 
            didComponentMount.current += 1
    }, [canSubmit])

    return(
        <div className='flex justify-center items-center'>
            <form className='flex flex-col mt-4' onSubmit={handleConfirm}>
                <div className="flex flex-col gap-4 w-[48rem]">
                    <h1 className="font-bold text-center mr-4">Create a Schedule</h1>
                    <div className='grid grid-cols-3 grid-rows-4 gap-y-8 gap-x-6 p-4 bg-yellow-700 rounded text-white'> 
                            <ClassForm 
                            handleChange={handleChange} 
                            errors={errors} 
                            sameTimeFlag={isSameTime}
                            isStartTimeValid={isStartTimeValid}
                            isEndTimeValid={isEndTimeValid} 
                            formData={formData}
                            />
                    </div>
                </div>
                <div className="flex gap-4 justify-between mt-4">
                    <button className="bg-red-600 p-4 rounded text-white" onClick={() => handleCancel()}>CANCEL</button>
                    <button className="bg-green-600 p-4 rounded text-white" type='submit'>CONFIRM</button>
                </div>
            </form>  
        </div>
    )
}