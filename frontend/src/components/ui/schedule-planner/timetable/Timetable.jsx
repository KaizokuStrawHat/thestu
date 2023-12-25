import '../../../../index.css';
import { useEffect, useState, useRef } from 'react'
import Column from './Column'
import Timeblock from "./Timeblock";
import { startOfWeek, format, addDays } from 'date-fns';
import axios from 'axios';

export default function Timetable({currentDate}){
    const [weekSchedule, setWeekSchedule] = useState(false)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const times = ['12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', 
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', 
    '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM',
    '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', 
    '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM',
    '9:00 AM', '10:00 AM', '11:00 AM'];

    const [dates, setDates] = useState([])
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        // dates array will only have 7 items at a time
        // placeholder is for frontend, display these as headers of the table (DATE - DAY)
        let placeholder = [];

        // formattedDates is for backend
        let formattedDates = [];

        for (let i = 0; i <= 6; i++)
        {   
            formattedDates.push(format(addDays(startOfWeek(currentDate), i),'yyyy-MM-dd'))
            placeholder.push(format(addDays(startOfWeek(currentDate), i),'MMM d'))
            setDates(placeholder)   
        };

        // fetch schedules of one week
        const getTimeslots = async () => {
            try { 
                let response = await axios.post('http://localhost:5000/timetable/testing-read', formattedDates) 
                setWeekSchedule(response.data)
            } catch (error) {
                console.error('Error: ', error) 
            }
        };
        
        getTimeslots();
    }, [currentDate])

    useEffect(() => {
        if ((weekSchedule)){
            console.log(weekSchedule)
        }

        // I can't access any properties, they are all undefined it says
        // but if I console.log weekschedule[0] its not undefined?
    }, [weekSchedule])

    const calculatePositionAndSize = (startTime, endTime) => {
        // Constants for calculations
        const pixelsPerHour = 80;  // For example, if each hour is represented by 80 pixels
        const minutesPerHour = 60;
        
        // Convert times from HHMM to total minutes
        const startTimeInMinutes = ((Math.floor(startTime / 100)) * minutesPerHour) + (startTime % 100);
        const endTimeInMinutes = ((Math.floor(endTime / 100)) * minutesPerHour) + (endTime % 100);
        const timetableStartInMinutes = 11 * minutesPerHour; // 1100 is 11 hours * 60 minutes
        
        // Calculate position and size in minutes, then convert to pixels
        const position = (startTimeInMinutes - timetableStartInMinutes) * (pixelsPerHour / minutesPerHour);
        const size = (endTimeInMinutes - startTimeInMinutes) * (pixelsPerHour / minutesPerHour);
    
        return { size, position };
    };
    
    return( 
        <>
            <div className='flex w-[90%] mt-2 mb-4 ml-20'>
                <div className='w-[5%] flex flex-col mt-[7.25rem]'>
                    {Array.from({ length: 23 }).map((_, index) => (
                        <div key={index} className="h-20 whitespace-nowrap text-end">
                            {times[index]}
                        </div>
                    ))}
                </div>
                <div className="w-[95%] grid grid-cols-7 pl-2">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} className="bg-yellow-700 text-center">
                            <span className='text-white block'>{dates[index]}</span>
                            <span className='text-white'>{days[index]}</span>
                        </div>
                    ))}

                    {weekSchedule &&
                    // Ensure weekSchedule is initialized and mapped properly
                    weekSchedule.map((schedule, i) => (
                        // Consider a more stable key if possible
                        <div key={i} className="border-l-2 border-r-2 h-20 relative"> 
                            <Column>
                                {
                                // Use optional chaining to safely access timeslots
                                schedule.timeslots?.map((timeslot, z) => {
                                    const { size, position } = calculatePositionAndSize(timeslot.startTime, timeslot.endTime);
                                    return (
                                    <Timeblock
                                        key={timeslot.id} // Ensure timeslot.id is unique and stable
                                        teacher={timeslot.teacher}
                                        category={timeslot.category}
                                        startTime={timeslot.startTime}
                                        endTime={timeslot.endTime}
                                        size={size}
                                        position={position}
                                    />
                                    );
                                })
                                }
                            </Column>
                        </div>
                    ))}
                    {Array.from({ length: 168 }).map((_, index) => (
                        (index >= 161) ? (
                            <div key={index} className="h-20">

                            </div>
                        ) : (
                            <div key={index} className="border-2 h-20">

                            </div> 
                    )))}
                </div>
            </div>
        </>
    )
}