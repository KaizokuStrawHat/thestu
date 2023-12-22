import React, { useState, useEffect } from "react";
import ScheduleDayCard from "../components/ui/ScheduleDayCard";
import '../index.css';

export default function Schedule(){

    const [arrayPlaceholder, setArrayPlaceholder] = useState([])

    // const dateString = '2023-10-01';
    // const date = new Date(dateString);
    // const dayOfWeek = date.getDay();
    // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // const dayName = daysOfWeek[dayOfWeek];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/schedule/getScheduleData');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
    }, [])


    return(
        <>
            <div className="flex flex-col">            
                <div className="ml-auto">
                    <button className="w-10 bg-gray-600 rounded-lg">&uarr;</button>
                    <p className='inline mx-4'>August 14-20</p>
                    <button className="w-10 bg-gray-600 rounded-lg">&darr;</button>
                    {/* When arrow up button clicked a */}
                    <button className="ml-4 mr-auto w-20 bg-gray-600 rounded-lg">Edit</button>
                </div>
                <div className="flex flex-wrap gap-4 mx-2 justify-center items-center my-10">
                    <ScheduleDayCard day={'M'} date={'Aug 14'} 
                    teachers={['Randall Mella', 'Thomas Boivin', 'Trung Nguyen']} 
                    times={['6PM', '7PM', '8PM']} 
                    levels={['BEG','INT','ADV']}
                    pictures={['<img1>', '<img2>', '<img3>']} />
                    <ScheduleDayCard day={'T'} date={'Aug 15'} 
                    teachers={['Carlos Guinto', 'Taylor Hatala', 'Adrian Vendiola']} 
                    times={['4PM', '6PM', '10PM']} 
                    levels={['INT','ADV','ADV']}
                    pictures={['<img4>','<img5>', '<img6>']} />
                    <ScheduleDayCard day={'W'} date={'Aug 16'} 
                    teachers={['Carlos Guinto', 'Taylor Hatala', 'Adrian Vendiola']} 
                    times={['4PM', '6PM', '10PM']} 
                    levels={['INT','ADV','ADV']}
                    pictures={['<img4>','<img5>', '<img6>']} />
                    <ScheduleDayCard day={'Th'} date={'Aug 17'} 
                    teachers={['Randall Mella', 'Thomas Boivin', 'Trung Nguyen']} 
                    times={['6PM', '7PM', '8PM']} 
                    levels={['BEG','INT','ADV']}
                    pictures={['<img1>', '<img2>', '<img3>']} />
                    <ScheduleDayCard day={'F'} date={'Aug 18'} 
                    teachers={['Carlos Guinto', 'Taylor Hatala', 'Adrian Vendiola']} 
                    times={['4PM', '6PM', '10PM']} 
                    levels={['INT','ADV','ADV']}
                    pictures={['<img4>','<img5>', '<img6>']} />
                    <ScheduleDayCard day={'S'} date={'Aug 19'} 
                    teachers={['Sadie Macalolooy', 'Renz Flores', 'Thomas Clark']} 
                    times={['4PM', '6PM', '10PM']} 
                    levels={['INT','ADV','ADV']}
                    pictures={['<img4>','<img5>', '<img6>']} />
                    <ScheduleDayCard day={'Su'} date={'Aug 20'} 
                    teachers={['Renz Flores', 'Taylor Hatala', 'Adrian Vendiola']} 
                    times={['4PM', '6PM', '10PM']} 
                    levels={['INT','ADV','ADV']}
                    pictures={['<img4>','<img5>', '<img6>']} />
                </div>
            </div>
            { arrayPlaceholder.map((item, index) => {
                return <div key={index}>
                    <p>{item.teacher_id}</p>
                    <p>{item.name}</p>
                    <p>{item.picture_url}</p>
                    <p>{item.time_created.split("T")[0]}</p>
                </div>
            })}
        </>
    );
}       