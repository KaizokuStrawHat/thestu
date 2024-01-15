const express = require('express')
const router = express.Router();
const pool = require('../../db');

function getDayOfWeek(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

router.post('/fetchOneWeek', async (req, res) => {
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
    console.log('weekschedule:', weekSchedule)    
    res.json(weekSchedule);
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;