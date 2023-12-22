import '../../index.css';
import React from 'react';
import NavLink from '../ui/NavLink';

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
    <NavLink name={'HOME'} route={'/home'} />
    <NavLink name={'SCHEDULE'} route={'/schedule'}/>
    <NavLink name={'FACULTY'} route={'/faculty'}/>
    <NavLink name={'CONTACT'} route={'/contact'}/>
    <NavLink name={'MERCH'} route={'/merch'}/>
    <NavLink name={'SCHEDULE-PLANNER'} route={'/schedule-planner'} />
  </div>
  );
}


// if mobile className='absolute inset-0 bg-red-400 justify-between'
// if pc 