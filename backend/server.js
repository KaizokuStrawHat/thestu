const express = require('express');
const cors = require('cors')
const scheduleRoutes = require('./src/routes/scheduleRoutes.js')
const dashboardRoutes = require('./src/routes/dashboardRoutes.js')
const timetableRoutes = require('./src/routes/timetableRoutes.js')

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static('build'));
server.use('/schedule', scheduleRoutes);
server.use('/dashboard', dashboardRoutes);
server.use('/timetable', timetableRoutes);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});         

/*

drop-in:
{ 
    levelRadio: level,
    dateStartTextbox: date, 
    startTimeTextbox: time_start,
    endTimeTextbox: time_end,
    studioTextbox: venue,
    teacherTextbox1: teacher, 
    recurrenceTextbox: recurrence, 
    dateEndTextbox: date_end
}

program:
{ 
    levelRadio: level,
    dateStartTextbox: date,
    dateEndTextbox: date_end,
    recurrenceTextbox: recurrence, 
    startTimeTextbox: time_start,
    endTimeTextbox: time_end,
    studioTextbox: venue,
    teacherTextbox1: teacher
}

workshop:
{ 
    dateStartTextbox: date, 
    dateEndTextbox: date_end,
    studioTextbox: venue,
    workshopClass: [
	    {same drop-in object}
    ]
} 

*/