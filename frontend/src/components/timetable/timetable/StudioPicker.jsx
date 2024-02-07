import axios from "axios";
import React, { useEffect, useState } from "react";

export default function StudioPicker({currentStudio, setCurrentStudio, deleteIsClicked}) {
    const [studios, setStudios] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/timetable/fetchStudios');
                setStudios(response.data);
            } catch (err) {
                console.error(err)
            }
        } 
        fetchStudios();
    }, [deleteIsClicked])

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
            {currentStudio ? (
                <>
                    <button onClick={() => leftHandleClick()}>&lt;</button>
                    <button className="text-center">{currentStudio}</button>
                    <button onClick={() => rightHandleClick()}>&gt;</button>
                </>
            ) : (studios.length === 0) ? (
                <p>No timeblocks found</p>
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    )
}

/* TSX
export default function StudioPicker({currentStudio, setCurrentStudio, deleteIsClicked}) {
    const [studios, setStudios] = useState<string[]>([])
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/timetable/fetchStudios');
                setStudios(response.data);
            } catch (err) {
                console.error(err)
            }
        } 
        fetchStudios();
    }, [deleteIsClicked])

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
            {currentStudio ? (
                <>
                    <button onClick={() => leftHandleClick()}>&lt;</button>
                    <button className="text-center">{currentStudio}</button>
                    <button onClick={() => rightHandleClick()}>&gt;</button>
                </>
            ) : (studios.length === 0) ? (
                <p>No timeblocks found</p>
            ) : (
                <p>Loading ...</p>
            )}
        </div>
    )
}*/