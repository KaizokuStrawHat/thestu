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
        // Prevents index from going over array's length
        if (studios.length === index + 1) {
            setIndex(0)
        } else{
            setIndex(index + 1)
        }
    }

    const leftHandleClick = () => {
        // Prevents index from going negative
        if (index - 1 < 0) {
            setIndex(studios.length - 1)
        } else {
            setIndex(index - 1)
        }
    }

    useEffect(() => {
        if (studios)
        setCurrentStudio(studios[index])
    }, [studios, index])

    return(
        <div className="flex justify-center gap-2">
            {hasMounted && currentStudio ? (
                <>
                    <button onClick={() => leftHandleClick()}>&lt;</button>
                    <button className="text-center">{currentStudio}</button>
                    <button onClick={() => rightHandleClick()}>&gt;</button>
                </>
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    )
}