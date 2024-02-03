import { React, useState } from 'react';
import { startOfMonth, setISODay, addMonths, subMonths, addWeeks, format } from 'date-fns';
import DateButton from './DateButton';

export default function Calendar({selectedDates, setSelectedDates, setPhase, setFormData}){

    console.log('this is selectedDates:', selectedDates)

    const [date, setDate] = useState(new Date());
    const firstDate = startOfMonth(date);
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fri', 'Sat'];
    const datesArray = [];  

    for (let i = 0; i <= 5; i++){
        for (let z = 0; z <= 6; z++){   
            datesArray.push({
                dateID: format(setISODay(addWeeks(firstDate, i), z), 'yyyy-MM-dd'),
                dateString: format(setISODay(addWeeks(firstDate, i), z), 'd'),
                isActive: selectedDates.includes(format(setISODay(addWeeks(firstDate, i), z), 'yyyy-MM-dd')),
                isCurrentMonth: setISODay(addWeeks(firstDate, i), z).getMonth() === date.getMonth()
            });
        };
    };
    
    const handleDateClick = (buttonID) => {
        setSelectedDates(prevSelectedDates => {
            const isSelected = prevSelectedDates.includes(buttonID);
            const newSelectedDates = isSelected
                ? prevSelectedDates.filter(id => id !== buttonID)
                : [...prevSelectedDates, buttonID];
            return newSelectedDates;
        });
    };

    const handleUpButton = () => {
        setDate(addMonths(date, 1));
    };
    
    const handleDownButton = () => {
        setDate(subMonths(date, 1));
    };

    const handleConfirmClick = () => {
        setSelectedDates(prevSelectedDates => {
            const newSelectedDates = [...prevSelectedDates].sort();
            return newSelectedDates;
        });

        // Initializing as objects to add 'status' property and have that as placeholder for front-end and will be assigned a value from './checkTimeConflict'.
        // Sorting 'selectedDates' to ensure dates are rendered in an organized ascending order.
        let result = [...selectedDates].sort().map(date => ({
            date: date,
            status: ''
        }));


        setFormData(prevFormData => ({
            ...prevFormData,
            schedulesArray: result
        }))

        setPhase(3);
    }

    return(
        <div className='flex justify-center items-center'>
            <div className='flex flex-col mt-4'>
                <div>
                    <h1 className="font-bold text-center w-[27rem] whitespace-nowrap mb-4"> Select days </h1>
                    <div className='w-[27rem] h-[32rem] p-2 bg-yellow-700 rounded'>
                        <div className='flex justify-between mb-3.5'>
                            <div className='flex'>
                                <button className='text-white ml-2'>{format(date, 'MMMM')}</button>
                                <button className='text-white ml-2'>{date.getFullYear()}</button>
                            </div>
                            <div className='flex gap-6 mr-2.5 mb-2'>
                                <button className='w-[32px] h-[26px] py-[4px] rounded text-white' onClick={() => handleDownButton()}>&#8595;</button>
                                <button className='w-[32px] h-[26px] py-[4px] rounded text-white' onClick={() => handleUpButton()}>&#8593;</button>
                            </div>
                        </div>
                        <div className='grid grid-rows-7 grid-cols-7 h-[90.5%] gap-2 place-items-center'>
                            {Array.from({ length: 7 }).map((_, index) => {
                                return (
                                    <div className='py-1 text-center self-center rounded w-8 text-white bg-yellow-600 hover:bg-green-300' key={index}>{days[index]}</div>
                                )
                            })}
                            {datesArray.map((date, index) => {
                                return (
                                    <DateButton date={date.dateString} 
                                    isActive={date.isActive} 
                                    isCurrentMonth={date.isCurrentMonth} 
                                    handleDateClick={handleDateClick} 
                                    id={date.dateID}
                                    key={date.dateID}
                                />)
                            })}
                        </div>
                    </div>  
                </div>
                <div className="flex gap-4 justify-between mt-4">
                    <button className="bg-red-600 p-4 rounded text-white" onClick={() => setPhase(1)}>BACK</button>
                    <button className={`${selectedDates.length === 0 ? 'bg-gray-500 text-gray-100' : 'bg-green-600 text-white'}  p-4 rounded`} onClick={() => handleConfirmClick()} disabled={selectedDates.length === 0}>CONFIRM</button>
                </div>
            </div>
        </div>
    )   
}