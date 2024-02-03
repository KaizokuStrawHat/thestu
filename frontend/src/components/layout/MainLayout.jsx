import { Outlet } from "react-router-dom"
import NavigationLayout from "./NavigationLayout"
import NavigationDrawer from "../ui/NavigationDrawer"
import Logo from "../Logo"
import Header from "./Header"

export default function MainLayout(){
    return(
        <>
            <Header>
                <Logo/>
                <NavigationLayout />
            </Header>
            <Outlet />
        </>
    )
}

// export default function MainLayout({isViewPortBelow864}){
//     return(
//         <>  
//             {isViewPortBelow864 ? (
//                 // Mobile
//                 <>
//                     <Header>
//                         <Logo/>
//                     </Header>
//                     <Outlet />
//                     <NavigationDrawer/>
//                 </>
//             ): (
//                 // PC
//                 <>
//                     <Header>
//                         <Logo/>
//                         <NavigationLayout />
//                     </Header>
//                     <Outlet />
//                 </>
//             )}
//         </>
//     )
// }
