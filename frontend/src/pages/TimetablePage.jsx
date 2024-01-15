import React, {useState, useEffect} from "react";
import AddClassFormLayout from "../components/ui/schedule-planner/add-class-form/AddClassFormLayout";
import Timetable from "../components/ui/schedule-planner/timetable/Timetable";
import WeekRangePicker from "../components/ui/schedule-planner/WeekRangePicker";
import Calendar from "../components/ui/schedule-planner/calendar/Calendar";
import ConfirmationFormsLayout from "../components/ui/schedule-planner/confirmation-form/ConfirmationFormsLayout";
import AddTeacherFormLayout from "../components/ui/schedule-planner/AddTeacherFormLayout";

export default function TimetablePage(){        
  const [currentDate, setCurrentDate] = useState(new Date());
  const [phase, setPhase] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [isOvernight, setIsOvernight] = useState(false);
  const [formData, setFormData] = useState({
    categoryRadio: '',
    levelRadio: '',
    startTimeTextbox: '',
    endTimeTextbox: '',
    studioTextbox: '',
    teacherTextbox: ''
  });

  // useEffect(() => {
  //   console.log(phase)
  // }, [phase])

  return( 
      // <>
      //   {(phase === 0 ) ? (
      //   <>
      //     <div className="flex mt-2 w-[93.25%]">
      //       <div className="w-[39.5%]"></div>
      //       <div className="w-[35.5%]">
      //         <WeekRangePicker currentDate={currentDate} setCurrentDate={setCurrentDate}/>
      //         <div className="flex justify-center">
      //           <p> &lt; Studio A &gt;</p>
      //         </div>
      //       </div>
      //       <div className="flex items-right justify-end gap-2 w-[30%]">
      //         <button className="bg-green-500 rounded p-2 text-white" onClick={() => setPhase(1)}>Create</button>
      //         <button className="bg-red-500 rounded p-2 text-white"> Delete </button>
      //         {/* <button className="bg-blue-400 rounded p-2 text-white"> Filter </button>
      //         <button className="bg-gray-300 rounded p-2 text-white" onClick={() => setPhase(4)}> Settings </button> */}
      //       </div>
      //     </div>
      //     <Timetable currentDate={currentDate} /> 
      //   </>
      //   ) : (phase === 1) ? (
      //     <>
      //       <AddClassFormLayout 
      //       setPhase={setPhase} 
      //       setFormData={setFormData} 
      //       setSelectedDates={setSelectedDates} 
      //       formData={formData} 
      //       setIsOvernight={setIsOvernight}
      //       />
      //     </>
      //   ) : (phase === 2) ? (
      //     <>
      //       <Calendar selectedDates={selectedDates} 
      //       setSelectedDates={setSelectedDates} 
      //       setPhase={setPhase} 
      //       formData={formData} 
      //       setFormData={setFormData}
      //       />
      //     </>
      //   ) : (phase === 3) ? (
      //     <>
      //       <ConfirmationFormsLayout 
      //       formData={formData}
      //       setFormData={setFormData}  
      //       setPhase={setPhase} 
      //       isOvernight={isOvernight}
      //       />
      //     </>
      //   ) : (phase === 4) ? (
      //     <>
      //       <AddTeacherFormLayout/>
      //     </>
      //   ) : null}
      // </>
      <>
        <ConfirmationFormsLayout />
      </>
    )
}