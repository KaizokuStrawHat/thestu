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
    let placeholder = []
    let status = ''
    // Ensures that both arrays are same length to proceed
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

// Takes the start time, end time, and schedules
// Returns schedules objects with new value property
async function checkTimeConflict(schedulesArray, startTime, endTime){
    const conflictsPromises = schedulesArray.map( async (schedule, iteration) => {
      // Grab a studiotimeslots record with only id, startTime, endTime with the same date
      let timeslots = await pool.query(`
        SELECT id, "startTime", "endTime" FROM studiotimeslots
        WHERE studioday_id IN (SELECT id FROM studiodays WHERE date = $1);`,  
        [schedule.date]
      );  
  
    //   console.log(`iteration ${iteration}:${JSON.stringify(timeslots.rows[0])}`)

      // If no timeslots exist on the same date, no conflict
      if (timeslots.rows.length === 0){
        console.log('Timeslots not found, returning success')
        return {
          ...schedule,
          status: 'SUCCESS'
        }
      }
  
      // Converting into military time integer data type and renaming the variable
      let PendingStartTime = convertToMilitaryTime(startTime)
      let PendingEndTime = convertToMilitaryTime(endTime)
  
      // For each timeslots in the same date, check time conflict
      let conflictDetected = false;
      for (let timeslot of timeslots.rows) {
        let ExistingTimeslotStart = timeslot.startTime;
        let ExistingTimeslotEnd = timeslot.endTime;
        console.log('ExistingTimeslotStart:', ExistingTimeslotStart,
        'PendingEndTime:', PendingEndTime,
        'PendingStartTime:', PendingStartTime,
        'ExistingTimeslotEnd:', ExistingTimeslotEnd
        )
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
          schedulesArray: schedulesArray, 
          startTimeTextbox: startTime, 
          endTimeTextbox: endTime
        } = form;
        return await checkTimeConflict(schedulesArray, startTime, endTime);
      });

      Promise.all(promises).then(placeholder => {
        // If non-overnight
        if (placeholder.length === 1) {
          res.json(placeholder.flat())
        }
        // If overnight
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
  
// async function postNewClass({
//     categoryRadio: category, 
//     levelRadio: level, 
//     studioTextbox: studio, 
//     teacherTextbox1: teacher, 
//     startTimeTextbox: startTime, 
//     endTimeTextbox: endTime,
//     schedulesArray,
//     isOvernight
// }) {
  
//     // console.log('category:', category);
//     // console.log('level:', level);
//     // console.log('studio:', studio);
//     // console.log('teacher:', teacher);
//     // console.log('startTime:', startTime);
//     // console.log('endTime:', endTime);
//     // console.log('schedulesArray:', schedulesArray);
  
//     for (const schedule of schedulesArray) {  
//       // if date already exists, do nothing
//       // if date does not exists, insert and fetch new record's id
//       let studiodayResult = await pool.query(`
//         INSERT INTO studiodays(date, day) 
//         VALUES ($1, $2)
//         ON CONFLICT (date) 
//         DO UPDATE SET date = EXCLUDED.date
//         RETURNING id`,
//         [schedule.date, getDayOfWeek(schedule.date)]
//       );
      
//       let studiodayId = studiodayResult.rows[0].id;
  
//       // Insert into studiotimeslots using the retrieved studiodayId
//       await pool.query(`
//         INSERT INTO studiotimeslots (studioday_id, category, level, venue, "startTime", "endTime", teacher) 
//         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, 
//         [studiodayId, category, level, studio, convertToMilitaryTime(startTime), convertToMilitaryTime(endTime), teacher]
//       );
  
  
  
  
  
  
  
//       // a way to grab two ids 
  
  
  
  
  
  
  
  
  
  
  
  
  
//       // Generate 
//       if (isOvernight)
//         await pool.query(`
//           INSERT INTO overnightpairs ()
//         `)
  
//       // FEATURE of assigning more than two teachers:
//       // let studioscheduleId = studioscheduleResult.rows[0].id;
//       // await pool.query(`
//       //   INSERT INTO teacherassignments (studioschedule_id, teacher_id)
//       //   SELECT $1, (SELECT id FROM teachers WHERE name = $2)`,
//       //   [studioscheduleId, teacher]
//       // );
//     }
// }
  
// router.post('/postNewClass', async (req, res) => {
//     try { 
//       // const {
//       //     categoryRadio: category,
//       //     levelRadio: level,
//       //     studioTextbox: studio,
//       //     teacherTextbox1: teacher,
//       //     schedulesArray: schedulesArrays,    
//       //     startTimeTextbox: startTime,
//       //     endTimeTextbox: endTime,
//       // } = req.body
  
//       const {
//         // Re-naming for minor readability convenience
//         schedulesArray: schedulesArrays,
//         ...prop 
//       } = req.body;
//       await pool.query('BEGIN');
//       if (schedulesArrays.length === 2) {
//         await postNewClass({
//           ...prop,
//           schedulesArray: schedulesArrays[0],
//           endTimeTextbox: '11:59 PM',
//           isOvernight: true
//         }); 
//         await postNewClass({
//           ...prop,
//           schedulesArray: schedulesArrays[1],
//           startTimeTextbox: '12:00 AM',
//           isOvernight: true
//         }) 
//       } else if (schedulesArrays.length === 1) {
//         await postNewClass({
//           ...prop,
//           schedulesArray: schedulesArrays[0],
//           isOvernight: false
//         })
//       } else {
//         throw new Error('Invalid schedulesArrays length')
//       }
  
//       res.json('SUCCESSFUL POST!')
      
//       await pool.query('COMMIT');
//     } 
//     catch (err) {
//       await pool.query('ROLLBACK');
//       console.error(err);
//     }
// }); 
  
router.post('/postNewClass', async (req, res) => {
    try { 
      const {
          categoryRadio: category,
          levelRadio: level,
           studioTextbox: studio,
          teacherTextbox1: teacher,
          schedulesArray: schedulesArrays,    
          startTimeTextbox: startTime,
          endTimeTextbox: endTime,
          isOvernight: isOvernight,
      } = req.body

      let savedEndTime = endTime
      let studioschedule_id = null;
      let studiotimeslot1_idArray = [];
      let studiotimeslot2_id = null;
      let adjustedStartTime = startTime;
      let adjustedEndTime = endTime;

      await pool.query('BEGIN')

      for (const [iteration, schedulesArray] of schedulesArrays.entries()) {
        
        if (isOvernight && iteration === 0) {
          adjustedEndTime = '11:59 PM'
        }
  
        else if (isOvernight && iteration === 1) {
          adjustedStartTime = '12:00 AM'
          adjustedEndTime = savedEndTime
        }
        
        for (const [index, schedule] of schedulesArray.entries()) {
            // if date already exists, do nothing
            // if date does not exists, insert and fetch new record's id

            console.log('schedule', schedule)

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
            let = studioscheduleResult = await pool.query(`
            INSERT INTO studiotimeslots (studioday_id, category, level, venue, "startTime", "endTime", teacher) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`, 
            [studiodayId, category, level, studio, convertToMilitaryTime(adjustedStartTime), convertToMilitaryTime(adjustedEndTime), teacher]
            );
            console.log('2')

            // console.log('studioscheduleResult id:', studioscheduleResult.rows[0].id)
                
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
            }
        }
      }
      
      await pool.query('COMMIT');
    }
    catch (err) {
      await pool.query('ROLLBACK');
      console.error(err);
    }
}); 

  module.exports = router;