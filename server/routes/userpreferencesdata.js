const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/:username", async(req, res) => {
    const query = "SELECT * FROM preferences WHERE username = '"+ req.params.username + "'";
    connection.query(query, (error, result) =>{
        if(error) throw error
        res.json(result);
    });
});

module.exports = router