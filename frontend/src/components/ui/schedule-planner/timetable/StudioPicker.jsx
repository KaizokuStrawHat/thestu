import axios from "axios"
import { useEffect, useState } from "react"

export default function StudioPicker({currentStudio, setCurrentStudio}) {

    const [studios, setStudios] = useState(null)
    const [index, setIndex] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        const fetchStudios = async () => {
            const response = await axios.get('http://localhost:5000/timetable/fetchStudios');
            setStudios(response.data);
            setHasMounted(true);
        } 
        fetchStudios();
    }, [])

    const rightHandleClick = () => {
        setIndex(index + 1)
        if (studios.length === index + 1) {
            setIndex(0)
        } 
    }

    const leftHandleClick = () => {
        setIndex(index - 1)
        console.log('studios.length:', studios.length)
        console.log('index:', index)

        /* 
            if index became negative

        */


        if (index - 1 < 0) {
            setIndex(studios.length - 1)
        }
    }

    useEffect(() => {
        console.log('current index:', index)
    }, [index])

    return(
        <div className="flex justify-center gap-2">
            {hasMounted && studios ? (
                <>
                    <button onClick={() => leftHandleClick()}>&lt;</button>
                    <button className="text-center">{studios[index]}</button>
                    <button onClick={() => rightHandleClick()}>&gt;</button>
                </>
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    )
}