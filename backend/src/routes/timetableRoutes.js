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
    res.json(weekSchedule);
  } catch (err) {
    console.error(err)
  }
});

async function deleteTimeslotAndAssociatedData(deletingTimeslotId) {
  try {
    let deletingTimeslots_ids = [deletingTimeslotId]

    await pool.query('BEGIN');

    // Retrieve result to see if deleting timeslot has pair
    let pairs_results = await pool.query(`
      SELECT * 
      FROM overnightpairs 
      WHERE studiotimeslot1_id = $1 OR studiotimeslot2_id = $1`,
      [deletingTimeslotId]
    )

    // Check if pair exists
    if (pairs_results.rows.length !== 0) {
      // Initialize
      let studiotimeslot1_id = pairs_results.rows[0].studiotimeslot1_id;
      let studiotimeslot2_id = pairs_results.rows[0].studiotimeslot2_id;
      let overnightpair_id = pairs_results.rows[0].id;

      await pool.query(`
        DELETE FROM overnightpairs WHERE id = $1`, 
        [overnightpair_id]
      )
      deletingTimeslots_ids = [studiotimeslot1_id, studiotimeslot2_id]
    }

    for (const id of deletingTimeslots_ids) {
      // Retrieve the deleting studiotimeslot's studioday_id
      let studioday_result = await pool.query(`
        SELECT studioday_id FROM studiotimeslots WHERE id = $1`,  
        [id]
      )
      let studioday_id = studioday_result.rows[0].studioday_id

      // Delete studiotimeslot
      await pool.query(`
        DELETE FROM studiotimeslots WHERE id = $1`,
        [id]
      )

      // Check if any studiotimeslot is the retrieved studioday, if not, delete
      await pool.query(`
        DELETE FROM studiodays
        WHERE id = $1
        AND NOT EXISTS (
          SELECT 1 FROM studiotimeslots WHERE studioday_id = $1
        )`,
        [studioday_id]
      )
    }

    await pool.query('COMMIT');
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  }
};

router.delete('/deleteTimeslot/:timeslotId', async (req, res) => {
  try {
    deleteTimeslotAndAssociatedData(parseInt(req.params.timeslotId))
    res.status(204).send({ message: 'Successful deletion'});
  } catch (e) {
    console.error('Error:', e)
    res.status(500).send({ message: 'Error deleting timeslot.' });
  }
});

router.get('/fetchStudios', async (req, res) => {
  const StudioResult = await pool.query(`
  SELECT DISTINCT venue from studiotimeslots;
  `);
  const studios = StudioResult.rows.map(item => item.venue);
  res.json(studios);
});

module.exports = router;