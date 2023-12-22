import { format } from 'date-fns';

export default function Timeblock({teacher, category, startTime, endTime, size, position}){

    function convertToAmPm(fourDigitTime) {
        const hours = Math.floor(fourDigitTime / 100);
        const minutes = fourDigitTime % 100;
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return format(date, 'h:mm a');
    }

    return(
        <div className={`w-full absolute bg-red-400 rounded border-blue-200 p-4`} style={{ height: `${size}px`, top: `${position}px` }}>
            <p>{`${teacher} - ${category}`}</p>
            <p>{`${convertToAmPm(startTime)} - ${convertToAmPm(endTime)}`}</p>
        </div>
    )
}