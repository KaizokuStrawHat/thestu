import '../styles/index.css'
import logo from '../assets/the-stu-logo.png';

export default function Logo(){
    return(
        <>
            <img src={logo} alt='Logo' className='min-w-max'/>
        </> 
    );
}