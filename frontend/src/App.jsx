import React, { 
  useState, 
  useEffect 
} from 'react';
import './styles/index.css'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/Home.jsx';
import RegisterDropIn from './pages/registerDropIn.jsx';
import RegisterPrograms from './pages/registerPrograms.jsx';
import Faculty from './pages/Faculty.jsx';
import Contact from './pages/Contact.jsx';
import MerchLandingPage from './pages/MerchLandingPage.jsx';
import MerchHomePage from './pages/MerchHomePage.jsx';
import Register from './pages/Register.jsx';
import Error404 from './pages/Error404.jsx';
import Error505 from './pages/Error505.jsx';
import MainLayout from './components/layout/MainLayout.jsx';
import Schedule from './pages/Schedule.jsx';
import TimetablePage from './pages/TimetablePage.jsx';
import FrontPage from './pages/FrontPage.jsx';
import {
  ServerStatusContext, 
  ServerStatusProvider
} from './contexts/ServerStatusContext.jsx';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import ItemPage from './pages/ItemPage.jsx';


export default function App() {
  const queryClient = new QueryClient();
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
      {/* 
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
      */}
      <QueryClientProvider client={queryClient}>
        <ServerStatusProvider>
          <Routes>
            <Route path="/" element={<MainLayout isViewPortBelow864={isViewPortBelow864}/>}>
              <Route path="timetable" element={<TimetablePage />} />
              <Route path="merch" element={<MerchLandingPage />} />
              <Route path="merch/homepage-men" element ={<MerchHomePage />} />
              <Route path="merch/homepage-women" element ={<MerchHomePage />} />
              <Route path="merch/item/:id" element={<ItemPage />}/>
              <Route path="error505" element={<Error505 />} />
            </Route>
          </Routes>
        </ServerStatusProvider>
      </QueryClientProvider>
    </>
  );
};  