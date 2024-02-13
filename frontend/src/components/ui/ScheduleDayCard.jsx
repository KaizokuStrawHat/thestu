import React from "react";
import '../../styles/index.css'
import ScheduleTimeSlotCard from "./ScheduleSlotCard";
import { v4 as uuidv4 } from 'uuid';

export default function ScheduleDayCard({day, date, teachers, times, levels, pictures}){
    return(
        <div className="flex flex-col flex-shrink-0 bg-yellow-800 
        w-52 h-auto rounded-lg">
            <div className="mt-2 ml-2 mr-2 flex justify-between">
                <p className='inline'>{day}</p>
                <p className='inline place-self-end'>{date}</p>
            </div>
            <div className="flex flex-col gap-6 mt-6">
                {teachers.map((item, index) => (
                    <ScheduleTimeSlotCard key={uuidv4()} 
                    teachers={teachers[index]} 
                    times={times[index]} 
                    levels={levels[index]} 
                    pictures={pictures[index]} />
                ))}
            </div>
            {/* center a div above me */}
        </div>  
    )
}
