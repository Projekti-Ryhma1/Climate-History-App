const express = require("express");
const router = express.Router();
const database = require("../models/preferencesdata_model");

router.get("/user/:username", async(req, res) => {
    /* const query = "SELECT * FROM preferences WHERE username = '"+ req.params.username + "'";
    connection.query(query, (error, result) =>{
        if(error) throw error
        res.json(result);
    }); */

    try{
        res.status(200).json(await database.getUserPreferences(req.params.username));
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});

router.post("/preference", async(req, res) => {
    try{
        res.status(200).json(await database.updateUserPreference(true, "example", "2"));
    } catch(error){
            console.error(error);
            res.sendStatus(500);
        }
});

module.exports = router