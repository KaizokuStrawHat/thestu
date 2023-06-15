import DropdownButton from './ui/DropdownButton';
import logo from '../public/the-stu-logo.png';
import '../index.css';

export default function Navbar(){
    return(
    <div className="h-auto flex bg-yellow-800 gap-10">
      <div>
        <a><img src={logo} alt='Logo' className=''/></a>
      </div>
      <div className='flex gap-20 self-center ml-60'>   
        <DropdownButton name={'PROGRAMS'} listOfLinks={['COMPETITIVE','NON-COMPETITIVE']} />
        <button className='navbar-button'>SCHEDULE</button>
        <DropdownButton name={'BOOKING'} listOfLinks={['STUDIO RENTAL','PERFORMANCE']} />
        <button className='navbar-button'>FACULTY</button>
      </div>
    </div>
    )
}