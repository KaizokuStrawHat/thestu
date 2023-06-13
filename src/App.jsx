import {useState} from 'react'
import './index.css'

export default function App() {
  const [isTopLeft, setIsTopLeft] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-200">
      <h1 
        onClick={() => setIsTopLeft(!isTopLeft)} 
        className={`transition-all duration-1000 cursor-pointer
                    font-family: DKC Forever 
                    ${isTopLeft ? 'absolute top-0 left-0 m-4' : ''}`}
      >
        THE STU
      </h1>
    </div>
  );
}

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