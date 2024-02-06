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

function mergeOvernightArrays(schedulesArray) {
  let placeholder = [];
  let status = '';

  // Both arrays have same length 
  // Ensures schedulesArray is an overnight array
  if (schedulesArray[0].length === schedulesArray[1].length) {
    for (let i = 0; i < schedulesArray[0].length; i++) {
      if (schedulesArray[0][i].status === 'CONFLICT' || schedulesArray[1][i].status === 'CONFLICT')
        status = 'CONFLICT'
      else
        status = 'SUCCESS'
      placeholder.push({
        date: schedulesArray[0][i].date,
        status: status
      })
    }
  } else
      throw new Error('mergeOvernightArrays ERROR: schedulesArray should have same length')
  return placeholder
} 

function stringFormat(input) {
  return input.toLowerCase().replace(/(?:^|\s)\w/g, (match) => {
    return match.toUpperCase();
  });
}

async function checkTimeConflict(schedulesArray, startTime, endTime, venue){ 
  // For each schedule within schedulesArray:
  const conflictsPromises = schedulesArray.map( async (schedule, iteration) => {
    // Grab a studiotimeslots with the same date as request
    let timeslots = await pool.query(`
      SELECT id, "startTime", "endTime", venue FROM studiotimeslots
      WHERE studioday_id IN (SELECT id FROM studiodays WHERE date = $1);`,  
      [schedule.date]
    );  

    // If no timeslots exist on the request's date, return SUCCESS
    if (timeslots.rows.length === 0){
      return {
        ...schedule,
        status: 'SUCCESS'
      }
    }

    // Convert into military time format with integer as data type
    let PendingStartTime = convertToMilitaryTime(startTime)
    let PendingEndTime = convertToMilitaryTime(endTime)

    // For each timeslots with the same date, check time conflict
    let conflictDetected = false;
    for (let timeslot of timeslots.rows) {
      // If the fetched timeslot and pending timeslot do not have the same venue, return SUCCESS
      if (stringFormat(timeslot.venue) !== stringFormat(venue)){
        return {
          ...schedule,
          status: 'SUCCESS'
        }
      }

      
      let ExistingTimeslotStart = timeslot.startTime;
      let ExistingTimeslotEnd = timeslot.endTime;
      
      if (ExistingTimeslotStart <= PendingEndTime && PendingStartTime <= ExistingTimeslotEnd) {
        console.log(`TIME CONFLICT DETECTED: REQUEST with ${schedule.date} AND WITH EXISTING TIMESLOT ID${timeslot.id}`)
        conflictDetected = true;
        break;
      }
    }

    if (conflictDetected) {
      return {
        ...schedule,
        status: 'CONFLICT'
      }
    } else {
      return {
        ...schedule,
        status: 'SUCCESS'
      }
    }
  })
  return Promise.all(conflictsPromises);
}
  
router.post('/checkTimeConflict', async (req, res) => {
  try {
    // The req.body has to be always an array, in order to check if the schedule is overnight
    const formArray = req.body;

    let promises = formArray.map(async (form) => {
        const { 
            schedulesArray, 
            startTime, 
            endTime,
            studio: venue
        } = form;
        return await checkTimeConflict(schedulesArray, startTime, endTime, venue);
    });

    Promise.all(promises).then(placeholder => {
      // If non-overnight, remove outer array 
      if (placeholder.length === 1) {
        res.json(placeholder.flat())
      }
      // If overnight, keep outer array
      else if (placeholder.length === 2) {
        let result = mergeOvernightArrays(placeholder)
        res.json(result)
      } else
      throw new Error ('Placeholder desired length is not attained')
    }).catch(error => {
        console.error("An error occurred: ", error);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }  
})
  
router.post('/postNewClass', async (req, res) => {
    try { 
      const {
        category,
        level,
        studio,
        teacher,
        schedulesArray,    
        startTime,
        endTime,
        isOvernight,
      } = req.body

      let savedEndTime = endTime
      let studioschedule_id = null;
      let studiotimeslot1_idArray = [];
      let studiotimeslot2_id = null;
      let adjustedStartTime = startTime;
      let adjustedEndTime = endTime;

      await pool.query('BEGIN')

      let iteration = 0;
      for (subArray of schedulesArray) {
        // When user inputs like 2:00 PM - 1:59 PM, each schedule will be split into two
        if (isOvernight && iteration === 0) {
          adjustedEndTime = '11:59 PM'
        } else if (isOvernight && iteration === 1) {
          adjustedStartTime = '12:00 AM'
          adjustedEndTime = savedEndTime
        };
        let index = 0
        for (date of subArray) {
            // if date already exists, do nothing
            // if date does not exists, insert and fetch new record's id
            let studiodayResult = await pool.query(`
            INSERT INTO studiodays(date, day) 
            VALUES ($1, $2)
            ON CONFLICT (date) 
            DO UPDATE SET date = EXCLUDED.date
            RETURNING id`,
            [date, getDayOfWeek(date)]
            );

            let studiodayId = studiodayResult.rows[0].id;

            // Insert into studiotimeslots using the retrieved studiodayId
            let = studioscheduleResult = await pool.query(`
            INSERT INTO studiotimeslots (studioday_id, category, level, venue, "startTime", "endTime", teacher) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, 
            [studiodayId, category, level, studio, convertToMilitaryTime(adjustedStartTime), convertToMilitaryTime(adjustedEndTime), teacher]
            );
                
            studioschedule_id = studioscheduleResult.rows[0].id;
            
            // FEATURE of assigning more than two teachers:
            // await pool.query(`
            //   INSERT INTO teacherassignments (studioschedule_id, teacher_id)
            //   SELECT $1, (SELECT id FROM teachers WHERE name = $2)`,
            //   [studioscheduleId, teacher]
            // );

            if (isOvernight) {
              if (iteration === 0) {
                  studiotimeslot1_idArray.push(studioschedule_id)
              } else if (iteration === 1) {
                studiotimeslot2_id = studioschedule_id
                  await pool.query(`
                  INSERT INTO overnightpairs (studiotimeslot1_id, studiotimeslot2_id)
                  VALUES ($1, $2)`,
                  [studiotimeslot1_idArray[index], studiotimeslot2_id]
                );
              }
              index++
            }
        };
        iteration++;
      }
      
      await pool.query('COMMIT');
      res.sendStatus(201);
    }
    catch (err) { 
      await pool.query('ROLLBACK');
      console.error(err);
    }
}); 

module.exports = router;