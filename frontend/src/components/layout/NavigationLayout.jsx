import NavLink from "../ui/NavLink"

export default function NavigationLayout(){
    return(
        <>
            <div className="flex w-[800px] gap-2 ml-3 text-white">  
                {/* <NavLink name={'HOME'} route={'/home'} />
                <NavLink name={'SCHEDULE'} route={'/schedule'}/>
                <NavLink name={'FACULTY'} route={'/faculty'}/>
                <NavLink name={'CONTACT'} route={'/contact'}/>
                <NavLink name={'MERCH'} route={'/merch'}/>
                <NavLink name={'TIMETABLE'} route={'/timetable'}/> */}

                <NavLink name={'HOME'} route={'/'}/>
                <NavLink name={'SCHEDULE'} />
                <NavLink name={'FACULTY'} />
                <NavLink name={'CONTACT'} />
                <NavLink name={'MERCH'} />
                <NavLink name={'TIMETABLE'} route={'/timetable'}/>
            </div>
        </>
    )
}