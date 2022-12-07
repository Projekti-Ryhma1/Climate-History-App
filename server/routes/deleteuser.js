const express = require("express");
const router = express.Router();
const database = require('../models/deleteUser_model');

router.delete("/", async (req, res) => {
    const username = req.body.username;
    try{
    res.status(200).json(await database.deleteUser(username));
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router