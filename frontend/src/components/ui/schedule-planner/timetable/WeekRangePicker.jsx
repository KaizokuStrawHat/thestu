import React, { useState, useEffect } from 'react'
import { addWeeks, subWeeks, getISOWeek, getISOWeekYear, getWeek } from 'date-fns';

export default function WeekRangePicker({currentDate, setCurrentDate}){

    const [dateString, setDateString] = useState<string>('')

    useEffect(() => {
        // Formatting currentDate to 'Year XXXX, Week XX'
        let formattedISOWeek: number = getISOWeek(currentDate);
        let formattedISOYear: number = getISOWeekYear(currentDate);
        setDateString(`Year ${formattedISOYear}, Week ${formattedISOWeek} `)
    }, [currentDate])
    

    const rightHandleClick = () => {
        setCurrentDate(addWeeks(currentDate, 1))
    }
    const leftHandleClick = () => {
        setCurrentDate(subWeeks(currentDate, 1))
    }

    return(
        <div className="flex justify-center gap-2">
            <button onClick={() => leftHandleClick()}>&lt;</button>
            <button className="text-center">{dateString}</button>
            <button onClick={() => rightHandleClick()}>&gt;</button>
        </div>
    )
};