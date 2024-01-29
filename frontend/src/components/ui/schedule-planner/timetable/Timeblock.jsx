import { format } from 'date-fns';

export default function Timeblock({teacher, category, startTime, endTime, size, position, id, handleClick, isDeleteToggled}){
    function convertToAmPm(fourDigitTime) {
        const hours = Math.floor(fourDigitTime / 100);
        const minutes = fourDigitTime % 100;
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return format(date, 'h:mm a');
    }

    return(
        <button className={`w-full absolute bg-red-400 rounded border-blue-200 `} style={{ height: `${size}px`, top: `${position}px` }} onClick={() => handleClick(id)} disabled={!isDeleteToggled}>
            <div>
                <p>{teacher}</p>
                <p>{category}</p>
                <p>{`${convertToAmPm(startTime)} - ${convertToAmPm(endTime)}`}</p>
            </div>
        </button>
    )
}