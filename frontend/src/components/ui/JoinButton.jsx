import '../../index.css';
import Anchor from './Anchor';

export default function JoinButton(){
    return(
        <div className='p-10 bg-green-800'>
            <Anchor name={'Be THE STUdent'} route={'/register'}/>
        </div>
    )
}
