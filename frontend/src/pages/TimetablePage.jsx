import React, {useState, useEffect, useContext} from "react";
import AddClassFormLayout from "../components/timetable/add-class-form/AddClassFormLayout";
import Timetable from "../components/timetable/timetable/Timetable";
import Calendar from "../components/timetable/calendar/Calendar";
import ConfirmationFormsLayout from "../components/timetable/confirmation-form/ConfirmationFormsLayout";
import AddTeacherFormLayout from "../components/timetable/timetable/AddTeacherFormLayout";
import useServerStatus from "../hooks/useServerStatus";

export default function TimetablePage(){        
  useServerStatus();
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

/* TSX
export default function TimetablePage(){        
  useServerStatus();
  const [submitIsClicked, setSubmitIsClicked] = useState<boolean>(false);
  const [phase, setPhase] = useState<number>(0);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isOvernight, setIsOvernight] = useState<boolean>(false);

  type FormProps = {
    category: string;
    level: string;
    startTime: string;
    endTime: string;
    studio: string;
    teacher: string;
  }

  const [formData, setFormData] = useState<FormProps>({
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
}*/