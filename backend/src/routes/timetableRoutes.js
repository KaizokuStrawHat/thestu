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

async function deleteTimeslotAndAssociatedData(deletingTimeslotId) {
  try {
    await pool.query('BEGIN');

    // Find the deleting timeslot's studioday
    let studioday_result = await pool.query(`
      SELECT studioday_id FROM studiotimeslots WHERE id = $1`, 
      [deletingTimeslotId]
    );
    let deletingTimeslot_studiodayId = studioday_result.rows[0].studioday_id;
    

    // Delete the specified studiotimeslot record 
    await pool.query(`
      DELETE FROM studiotimeslots WHERE id = $1`, 
      [deletingTimeslotId]
    );

    // Check if there are any studiotimeslots using the deleted record's studioday
    let studiotimeslot_result = await pool.query(`
      SELECT id FROM studiotimeslots WHERE studioday_id = $1`,
      [deletingTimeslot_studiodayId]
    );

    // Delete studioday if no studiotimeslots are no longer using it
    if (studiotimeslot_result.rows.length === 0) 
      await pool.query(`
      DELETE from studiodays WHERE id = $1`,
      [deletingTimeslot_studiodayId]
    );

    await pool.query('COMMIT');
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
}

router.delete('/deleteTimeslot/:timeslotId', async (req, res) => {
  try {
    deleteTimeslotAndAssociatedData(parseInt(req.params.timeslotId))
    res.status(200).send({ message: 'Timeslot and associated data deleted successfully.' });
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: 'Error deleting timeslot.' });
  }
});

module.exports = router;