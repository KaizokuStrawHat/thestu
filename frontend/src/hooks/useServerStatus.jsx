import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ServerStatusContext } from "../contexts/ServerStatusContext"

export default function useServerStatus() {
    console.log('in useServerStatus.jsx')

    const isServerRunning = useContext(ServerStatusContext)

    const navigate = useNavigate();

    useEffect(() => {
        if (isServerRunning === false) {
            // Redirect to the error page if the server is not running
            navigate('/error505');
        }
    }, [isServerRunning, navigate]);

    return isServerRunning;
}