import clsx from "clsx";

export default function DateButton ({date, isActive, isCurrentMonth, handleDateClick, id}){

    const baseClass = 'py-0.5 px-0.5 text-center self-center rounded w-8';

    return(
        <button 
            className={clsx(baseClass, {
                'bg-green-700 hover:bg-yellow-700': isActive,
                'bg-yellow-700 hover:bg-green-700': !isActive,
                'text-white': isCurrentMonth,
                'text-gray-400': !isCurrentMonth
            })}
            key={id}
            onClick={() => handleDateClick(id)}
        >
            {date}
        </button>
    )
}