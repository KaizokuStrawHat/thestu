import '../../index.css';
import React from 'react';
import { Link } from 'react-router-dom';

// use <NavigationLayout /> since you want each pages to have this navigation menu

export default function NavigationDrawerLayout({isOpen}) {

  /*
  const LayoutClassName = clsx('', {
    'flex flex-col fixed inset-0 bg-red-400 items-center gap-30 w-screen h-screen px-10 py-5 gap-2' : isMobile
    '???'                                                                                           : isNotMobile
  });
  */
  return (
  <div className='flex flex-col fixed inset-0 bg-red-400 items-center gap-30 w-screen h-screen px-10 py-5 gap-2'>
    <Link to='/'> HOME </Link>
    <Link> SCHEDULE </Link>
    <Link> FACULTY </Link>
    <Link> CONTACT </Link>
    <Link to='/merch'> MERCH </Link>
    <Link to='/timetable'> TIMETABLE </Link>
  </div>
  );
}


// if mobile className='absolute inset-0 bg-red-400 justify-between'
// if pc 