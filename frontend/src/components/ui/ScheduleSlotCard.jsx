import React from "react"
import '../../styles/index.css'

export default function ScheduleTimeSlotCard({teachers, times, levels, pictures}){
    return(
        <div className='rounded-md bg-yellow-900'>
            <p>{teachers}</p>
            <p>{times}</p>
            <p>{levels}</p>
        </div>
    );
};