import React, {useState, useEffect} from "react";
import AddClassFormLayout from "../components/ui/schedule-planner/add-class-form/AddClassFormLayout";
import Timetable from "../components/ui/schedule-planner/timetable/Timetable";
import Calendar from "../components/ui/schedule-planner/calendar/Calendar";
import ConfirmationFormsLayout from "../components/ui/schedule-planner/confirmation-form/ConfirmationFormsLayout";
import AddTeacherFormLayout from "../components/ui/schedule-planner/AddTeacherFormLayout";

export default function TimetablePage(){        
  const [submitIsClicked, setSubmitIsClicked] = useState(false);
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

  return( 
      <>
        {(phase === 0 ) ? (
        <>
          <Timetable
          setPhase={setPhase}
          submitIsClicked={submitIsClicked}
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