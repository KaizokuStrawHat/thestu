const express = require('express')
const router = express.Router();
const pool = require('../../db');

function convertToMilitaryTime(timeString) {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
  } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
  }
  return parseInt(`${hours}${minutes}`, 10);
}

function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

function getWeekDaysArray(date) {
  var currentDate = new Date(date);
  var firstDay = new Date(currentDate);
  firstDay.setDate(firstDay.getDate() - firstDay.getDay());
  var weekDays = [];
  function formatDate(date) {
      var year = date.getFullYear();
      var month = ('0' + (date.getMonth() + 1)).slice(-2); 
      var day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
  }
  for (var i = 0; i < 7; i++) {
      var day = new Date(firstDay);
      day.setDate(day.getDate() + i);
      weekDays.push(formatDate(day));
  }
  return weekDays;
}

// Takes the start time, end time, and schedules
// Returns schedules objects with new value property
async function checkTimeConflict(schedulesArray, startTime, endTime){
  return schedulesArray.map( async (schedule) => {
    let timeslots = await pool.query(`
      SELECT id, startTime, endTime FROM studiotimeslots
      WHERE studioday_id IN (SELECT id FROM studiodays WHERE date = $1);`,  
      [schedule.date]
    );  
  
    // Converting into military time integer data type and renaming the variable
    let PendingStartTime = convertToMilitaryTime(startTime)
    let PendingEndTime = convertToMilitaryTime(endTime)
    for (let timeslot of timeslots.rows) {
      let ExistingTimeslotStart = timeslot.startTime;
      let ExistingTimeslotEnd = timeslot.endTime;
      if (ExistingTimeslotStart < PendingEndTime && PendingStartTime < ExistingTimeslotEnd) {
        console.log(`REQUEST with ${date.date} HAS TIME CONFLICT WITH EXISTING TIMESLOT ID${timeslot.id}`)
        return {
          ...schedule,
          status: 'CONFLICT'
        }
      }
      else
        return {
          ...schedule,
          status: 'SUCCESS'
        }
    }
  })
}

router.post('/testing-post2', async (req, res) => {
  try {
    const {
      startTime = startTime,
      endTime = endTime,
      schedulesArray = schedulesArray
    } = req.body
    // if conflict exists, throw error and return the array of errors to frontend
    let validatedSchedulesArray = await checkTimeConflict(schedulesArray, startTime, endTime)
    res.json({validatedSchedulesArray})
  } catch (error) {

  }
})

router.post('/testing-post', async (req, res) => {
  try {
    const {
        categoryRadio: category,
        levelRadio: level,
        studioTextbox: studio,
        teacherTextbox1: teacher,
        schedulesArray: schedulesArray, 
        startTimeTextbox: startTime,
        endTimeTextbox: endTime,
    } = req.body

    await pool.query('BEGIN')
 
    for (const schedule of schedulesArray) {  
      // if date already exists, do nothing
      // if date does not exists, insert and fetch new record's id
      let studiodayResult = await pool.query(`
        INSERT INTO studiodays(date, day) 
        VALUES ($1, $2)
        ON CONFLICT (date) 
        DO UPDATE SET date = EXCLUDED.date
        RETURNING id`,
        [schedule.date, getDayOfWeek(schedule.date)]
      );
      
      let studiodayId = studiodayResult.rows[0].id;
  
      // Insert into studiotimeslots using the retrieved studiodayId
      await pool.query(`
        INSERT INTO studiotimeslots (studioday_id, category, level, venue, "startTime", "endTime", teacher) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, 
        [studiodayId, category, level, studio, convertToMilitaryTime(startTime), convertToMilitaryTime(endTime), teacher]
      );

      // let studioscheduleId = studioscheduleResult.rows[0].id;
      // await pool.query(`
      //   INSERT INTO teacherassignments (studioschedule_id, teacher_id)
      //   SELECT $1, (SELECT id FROM teachers WHERE name = $2)`,
      //   [studioscheduleId, teacher]
      // );
    }
    await pool.query('COMMIT');
  } 
  catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
  }
}); 
 
     
router.post('/testing-read', async (req, res) => {
  try {
    const datesArray = req.body
    let weekSchedule = []

    await pool.query('BEGIN')
    for (const date of datesArray) {
      let timeslotsResult = await pool.query(`
        SELECT * FROM studiotimeslots
        WHERE studioday_id IN (SELECT id FROM studiodays WHERE date = $1);`,  
        [date]
      );  
      let timeslots = [];
      for (const timeslot of timeslotsResult.rows)
        timeslots.push(timeslot);
      weekSchedule.push({
        date: date,
        day: getDayOfWeek(date),
        timeslots: timeslots
      });
    }
    console.log(weekSchedule)
    res.json(weekSchedule);
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;