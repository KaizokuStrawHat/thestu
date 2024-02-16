const express = require('express')
const router = express.Router();
const pool = require('../../../db');

router.get("/itemPage/:id", async (req, res) => {
    try {   
        const id = req.params.id
        res.json(`success with ${id}`)
    } catch (err) {
        console.error(err)
    }
});

module.exports = router;