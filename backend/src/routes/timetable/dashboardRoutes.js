const express = require('express')
const router = express.Router();
const pool = require('../../../db');

router.post('/postTeacher', async (req, res) => {
  try {   
    const { nameTextbox: name, typeRadio: type, pictureTextbox: picture_url } = req.body;
    const result = await pool.query(
      'INSERT INTO teachers(name, type, picture_url) VALUES($1, $2, $3) RETURNING *', 
      [name, type, picture_url]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// insert this into a separate table and 'if it already exists logic'

module.exports = router;