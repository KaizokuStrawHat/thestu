import '../../index.css'
import { Link } from 'react-router-dom';

export default function Anchor ({name, route}){
    return <Link to={route} className='whitespace-nowrap'>{name}</Link>;
}