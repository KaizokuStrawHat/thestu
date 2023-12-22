import Anchor from './Anchor';
import DropdownButton from './DropdownButton';

export default function NavLink({name, route}) {

    /* for PC only --- SAVED JUST IN CASE
    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (dropdownName) => {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };
    */

    return(
    <div  className='text-white text-center py-4 w-full 
    hover:text-yellow-500
    focus:bg-yellow-800' >
      <Anchor name={name} route={route}/>
    </div>
    );
}






 








// ! when hovered clicked -- put 'THE' on the button's names
// ! when clicked -- keep 'THE'


// MY MAIN GOAL: TO BUILD MY OWN START UP 


// MY SIDE GOAL: MAKE MONEY -- do these:
// *vital too if I do my services for businesses: insurance, web, email marketing

// salesforce
// email developer

// staffing agencies
// craigslist

// be contractors/freelancers

// eCommerce Developer (25:13 timestamp) / Shopify Developer
// -ad platform pixels
// -tracking parameters for commercial sites

// wordpress
// google tech manager
// google pixels
// ads tracking
// sketch
// photostop
// adobe xd	