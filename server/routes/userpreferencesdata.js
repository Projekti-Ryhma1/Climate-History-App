const { request } = require("express");
const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/userpreferences/:username", async(req, res) => {
    const query = "SELECT * FROM userpreferences WHERE username = "+ request.params.username;
    connection.query(query, (error, result) =>{
        if(error) throw error;
        res.json(result);
    });
});

module.exports = router