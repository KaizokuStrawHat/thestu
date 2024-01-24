import '../../../../index.css';
import { useEffect, useState, useRef } from 'react'
import Column from './Column'
import Timeblock from "./Timeblock";
import { startOfWeek, format, addDays } from 'date-fns';
import axios from 'axios';
import WeekRangePicker from './WeekRangePicker';
import StudioPicker from './StudioPicker';

export default function Timetable({setPhase, setCurrentDate, currentDate, submitIsClicked, setSubmitIsClicked}){
    const [weekSchedule, setWeekSchedule] = useState(false)
    const [toggleDelete, setToggleDelete] = useState(false)
    const [deleteIsClicked, setDeleteIsClicked] = useState(false)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const times = ['1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', 
    '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM',
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',     
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', 
    '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM',
    ];

    const [dates, setDates] = useState([])
    const isFirstRender = useRef(true)
    let formattedDates = [];

    useEffect(() => {
        console.log('It is I')
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        let placeholder = [];

        for (let i = 0; i <= 6; i++)
        {   
            formattedDates.push(format(addDays(startOfWeek(currentDate), i),'yyyy-MM-dd'))
            placeholder.push(format(addDays(startOfWeek(currentDate), i),'MMM d'))
            setDates(placeholder)   
        };
        
        // Fetch schedules of one week
        const getTimeslots = async () => {
            try { 
                let response = await axios.post('http://localhost:5000/timetable/fetchOneWeek', formattedDates) 
                console.log('this is the response: ', response.data);
                setWeekSchedule(response.data)
            } catch (error) {
                console.error('Error: ', error) 
            }
        };
        
        getTimeslots();
        setDeleteIsClicked(false)
    }, [currentDate, deleteIsClicked, submitIsClicked])

    const calculatePositionAndSize = (startTime, endTime) => {
        // Variables for calculations
        const pixelsPerHour = 80;  // For example, if each hour is represented by 80 pixels
        const minutesPerHour = 60;
        let timeTableStart = 0;
        
        // Convert from HHMM to total minutes
        const startTimeInMinutes = ((Math.floor(startTime / 100)) * minutesPerHour) + (startTime % 100);
        const endTimeInMinutes = ((Math.floor(endTime / 100)) * minutesPerHour) + (endTime % 100);
        const timetableStartInMinutes = ((Math.floor(timeTableStart / 100)) * minutesPerHour) + (timeTableStart % 100); // 1100 is 11 hours * 60 minutes
        
        // Calculate position and size in minutes, then convert to pixels
        const position = (startTimeInMinutes - timetableStartInMinutes) * (pixelsPerHour / minutesPerHour);
        const size = (endTimeInMinutes - startTimeInMinutes) * (pixelsPerHour / minutesPerHour);

        return { size, position };
    };
    
    const handleDelete = () => {
        setToggleDelete(!toggleDelete)
    }

    const handleClick = async (timeslotId) => {
        await axios.delete(`http://localhost:5000/timetable/deleteTimeslot/${timeslotId}`);

        // To re-render the changes
        setDeleteIsClicked(true)
    };

    return( 
        <>
            <div className="flex mt-2 w-[93.25%]">
                <div className="w-[39.5%]"></div>
                <div className="w-[35.5%]">
                    <WeekRangePicker currentDate={currentDate} setCurrentDate={setCurrentDate}/>
                    <StudioPicker />
                </div>
                <div className="flex items-right justify-end gap-2 w-[30%]">
                    <button className="bg-green-500 rounded p-2 text-white w-[9.7%]" onClick={() => setPhase(1)}>Create</button>
                    <button className="bg-red-500 rounded p-2 text-white w-[9.7%]" onClick={() => handleDelete()}> {toggleDelete ? 'X' : 'Delete'} </button>
                    {/* <button className="bg-blue-400 rounded p-2 text-white"> Filter </button>
                    <button className="bg-gray-300 rounded p-2 text-white" onClick={() => setPhase(4)}> Settings </button> */}
                </div>
            </div>
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
                                {// Use optional chaining to timeslots only once the values has been initialized
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
                                        id={timeslot.id}
                                        handleClick={handleClick}
                                        toggleDelete={toggleDelete}
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