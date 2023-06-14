import {useState} from 'react'
import logo from './public/the-stu-logo.png'
import DropdownButton from './components/DropdownButton';
import './index.css'

export default function App() {

  return (
    <div className="h-1/5 flex bg-yellow-800 gap-10">
      <div>
        <a><img src={logo} alt='Logo' className=''/></a>
      </div>
      <div className='flex gap-20 self-center ml-60'>   
        <DropdownButton name={'PROGRAMS'} listOfLinks={['COMPETITIVE','NON-COMPETITIVE']} />
        <button>SCHEDULE</button> 
        <DropdownButton name={'BOOKING'} listOfLinks={['STUDIO RENTAL','PERFORMANCE']} />
        <button>FACULTY</button>
        <button>BOOKING</button>
      </div>
      {/* dropdown menu -- BOOKING: STUDIO,  */}
    </div>
  );
}


// onClick={() => setIsTopLeft(!isTopLeft)} 
// className={`transition-all duration-1000 cursor-pointer
//             font-family: DKC Forever 
//             ${isTopLeft ? 'absolute top-0 left-0 m-4' : ''}`}

/*

*/



/*
after loading sequence, THE STU animation moves top left THE STU becomes a child of upper-nav-bar

THE DANCE STU -- intro -- the normal word 'stu' transitions to top left left



*/
/*

! use the dance stu instagram for color scheme and concepts
concepts: the x mark background, the garage, the sandpaper








*/

// When about to publish -- pay and use this font to use for the word the stu -- https://www.fontsquirrel.com/matcherator?token=d7blgvlm1cgpwsfk