import React, { 
  useState, 
  useEffect 
} from 'react';
import './index.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import RegisterDropIn from './pages/registerDropIn';
import RegisterPrograms from './pages/registerPrograms';
import Faculty from './pages/Faculty';
import Contact from './pages/Contact';
import Merch from './pages/Merch';
import Register from './pages/Register';
import Error404 from './pages/Error404';
import MainLayout from './components/layout/MainLayout';
import Schedule from './pages/Schedule';
import TimetablePage from './pages/TimeTablePage';
import FrontPage from './pages/FrontPage';

export default function App() {
  const [isViewPortBelow864, setIsViewPortBelow864] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= 864 ? setIsViewPortBelow864(true) : setIsViewPortBelow864(false); 
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" errorElement={<Error404 />} element={<MainLayout isViewPortBelow864={isViewPortBelow864} />}>
          <Route index element={<FrontPage />} />
          <Route path="home" element={<Home/>} />
          <Route path="schedule" element={<Schedule/>} />
          <Route path="timetable" element={<TimetablePage />} />
          <Route path="register" element={<Register />} />
          <Route path="drop-in" element={<RegisterDropIn />} />
          <Route path="programs" element={<RegisterPrograms />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="contact" element={<Contact />} />
          <Route path="merch" element={<Merch />} />
        </Route>
      </Routes>
    </>
  );
};