const express = require('express')
const router = express.Router();
const pool = require('../../db');

router.get("/getScheduleData", async (req, res) => {
    try {
      let studioDays = await pool.query('SELECT * FROM StudioDays');
      let teachers = await pool.query('SELECT * FROM Teachers');
      let studioDaysPromises = studioDays.rows.map(async (day) => {
        let schedules = await pool.query('SELECT * FROM StudioSchedules WHERE studio_day_id = $1', [day.id]);
        let schedulesPromises = schedules.rows.map(async (schedule) => {
          let teacherAssignments = await pool.query('SELECT * FROM TeacherAssignments WHERE studio_schedule_id = $1', [schedule.id]);
          return {  
              id: schedule.id,
              studio_day_id: schedule.studio_day_id,
              type: schedule.type,
              time_start: schedule.time_start,
              time_end: schedule.time_end,
              recurrence: schedule.recurrence,
              date_end: schedule.date_end,
              level: schedule.level,
              venue: schedule.venue,
              teacher_assignments: teacherAssignments.rows
          }
        });
        const schedulesJson = await Promise.all(schedulesPromises);
        return {
          id: day.id,
          date: day.date,
          StudioSchedules: schedulesJson
        };
      });

      const studioDaysJson = await Promise.all(studioDaysPromises);

      let finalJson = {
        StudioDays: studioDaysJson,
        Teachers: teachers.rows
      }

      res.json(finalJson)

    } catch (err) {
      console.error(err.message);
    }
});

module.exports = router;