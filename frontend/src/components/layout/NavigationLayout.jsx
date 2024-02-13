import { Link } from "react-router-dom"

export default function NavigationLayout(){
    return(
        <>
            <div className="flex max-[845px]:flex-col justify-center w-[800px] gap-12 ml-3 text-white text-lg text-center">  
                {/* <NavLink name={'HOME'} route={'/home'} />
                <NavLink name={'SCHEDULE'} route={'/schedule'}/>
                <NavLink name={'FACULTY'} route={'/faculty'}/>
                <NavLink name={'CONTACT'} route={'/contact'}/>
                <NavLink name={'MERCH'} route={'/merch'}/>
                <NavLink name={'TIMETABLE'} route={'/timetable'}/> */}

                <Link to='/'> HOME </Link>
                <Link> SCHEDULE </Link>
                <Link> FACULTY </Link>
                <Link> CONTACT </Link>
                <Link to='/merch'> MERCH </Link>
                <Link to='timetable'> TIMETABLE </Link>
            </div>
        </>
    )
}