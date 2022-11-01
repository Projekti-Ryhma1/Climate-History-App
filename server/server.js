const express = require('express')
const cors = require('cors')

const port = 3001
const app = express()

app.use(cors())


app.get('/', (req,res) => {
    res.send(200);
    res.end();
})

app.listen(port)