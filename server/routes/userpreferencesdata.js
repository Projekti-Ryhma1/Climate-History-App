const express = require("express");
const router = express.Router();
const database = require("../models/preferencesdata_model");

/* router.get("/user/:username", async(req, res) => {
    console.log("hello space");
    try{
        res.status(200).json(await database.getUserPreferences(req.params.username));
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}); */

router.get("/user/:username/:groupid", async(req, res) => {
    try{
        res.status(200).json(await database.getUserPreferenceInformation(req.params.username, req.params.groupid));
    } catch(error){
        console.error(error);
        res.sendStatus(500);
    }
});
 
router.post("/preference", async(req, res) => {
    console.log(req.body);
    const preferenceValue = req.body.preferenceValue;
    const username = req.body.username;
    const preferenceID = req.body.preferenceID;
    const groupID = req.body.groupID;
    try{
        res.status(200).json(await database.updateUserPreference(preferenceValue, username, preferenceID, groupID));
    } catch(error){
            console.error(error);
            res.sendStatus(500);
        }
});

module.exports = router