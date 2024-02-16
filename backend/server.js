const express = require('express');
const cors = require('cors')
const scheduleRoutes = require('./src/routes/timetable/scheduleRoutes.js')
const dashboardRoutes = require('./src/routes/timetable/dashboardRoutes.js')
const timetableRoutes = require('./src/routes/timetable/timetableRoutes.js')
const confirmationRoutes = require('./src/routes/timetable/confirmationRoutes.js')
const ItemPageRoutes = require('./src/routes/merch/itemPageRoutes.js')

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static('build'));
server.use('/schedule', scheduleRoutes);
server.use('/dashboard', dashboardRoutes);
server.use('/timetable', timetableRoutes);
server.use('/confirmation', confirmationRoutes);
server.use('/merch', ItemPageRoutes);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});         

server.get('/checkServerStatus', async (req, res) => {
    res.sendStatus(200)
})