import React, {useState, useEffect} from "react";
import AddClassFormLayout from "../components/ui/schedule-planner/add-class-form/AddClassFormLayout";
import Timetable from "../components/ui/schedule-planner/timetable/Timetable";
import Calendar from "../components/ui/schedule-planner/calendar/Calendar";
import ConfirmationFormsLayout from "../components/ui/schedule-planner/confirmation-form/ConfirmationFormsLayout";
import AddTeacherFormLayout from "../components/ui/schedule-planner/AddTeacherFormLayout";

export default function TimetablePage(){        
  const [submitIsClicked, setSubmitIsClicked] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [phase, setPhase] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isOvernight, setIsOvernight] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    level: '',
    startTime: '',
    endTime: '',
    studio: '',
    teacher: ''
  });

  // const [formData, setFormData] = useState({
  //   category: "Drop-In",
  //   level: "Advance",
  //   startTime: "11:00 AM",
  //   endTime: "12:00 PM",
  //   studio: "Studio A",
  //   teacher: "Teo",
  //   schedulesArray: [
  //     {
  //         date: "2024-02-01",
  //         status: ""
  //     },
  //     {
  //         date: "2024-02-02",
  //         status: ""
  //     },
  //     {
  //         date: "2024-02-03",
  //         status: ""
  //     }
  //   ]
  // });

  // useEffect(() => {
  //   console.log(phase)
  // }, [phase])

  return( 
      <>
        {(phase === 0 ) ? (
        <>
          <Timetable 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate}
          setPhase={setPhase}
          submitIsClicked={submitIsClicked}
          setSubmitIsClicked={setSubmitIsClicked}
          /> 
        </>
        ) : (phase === 1) ? (
          <>
            <AddClassFormLayout 
            setPhase={setPhase} 
            setFormData={setFormData} 
            setSelectedDates={setSelectedDates} 
            formData={formData} 
            setIsOvernight={setIsOvernight}
            />
          </>
        ) : (phase === 2) ? (
          <>
            <Calendar selectedDates={selectedDates} 
            setSelectedDates={setSelectedDates} 
            setPhase={setPhase} 
            formData={formData} 
            setFormData={setFormData}
            />
          </>
        ) : (phase === 3) ? (
          <>
            <ConfirmationFormsLayout 
            formData={formData}
            setFormData={setFormData}  
            setPhase={setPhase} 
            isOvernight={isOvernight}
            phase={phase}
            setSubmitIsClicked={setSubmitIsClicked}
            setSelectedDates={setSelectedDates}
            />
          </>
        ) : (phase === 4) ? (
          <>
            <AddTeacherFormLayout/>
          </>
        ) : null}
      </>
    )
}