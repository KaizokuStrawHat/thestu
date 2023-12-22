import '../../index.css';
import Anchor from './Anchor'; // Composition - ln 7

export default function DropdownButton({name, listOfLinks, toggleDropdown, shouldOpen}){
    return (
    <div className='flex flex-col
    justify-center items-center
    '>
        <Anchor name={name} onClick={() => toggleDropdown(name)}/> 
        {shouldOpen && (
        <ul className="flex flex-col
        mt-1.5 gap-1.5 p-5
        bg-yellow-700
        ">
            {
                listOfLinks.map((name, index) => (
                    <li key={index} >
                        <Anchor name={name} />
                    </li>
                ))
            }
        </ul>)}
    </div>
    );
}

// Is only enabled on PC
// <DropdownButton name={'BOOKINGS'} listOfLinks={['STUDIO RENTAL','PERFORMANCE']} toggleDropdown={toggleDropdown} shouldOpen={openDropdown === 'BOOKINGS'}/>
