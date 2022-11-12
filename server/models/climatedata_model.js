const database = require("../database")

async function getGlobalTempAnomaly(){
    const query = "SELECT * FROM global_temp_anomaly";
    database.query(query,(error, result)=>{
        if(error) throw error;
        return result;
    })
}

module.exports = { 
    getGlobalTempAnomaly
}