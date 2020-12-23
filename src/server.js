require('dotenv').config("./env");

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {createRabbitConnection} = require('./config/index')

const app = express()
const port = 30010

app.use(cors())
app.use(bodyParser.json())

app.get('/ping', function (req, res) {
    res.status(200).json({msg: "ping"})
})

app.get('/health', async function (req, res) {
    res.status(200).json({msg: "health"})
})

app.listen(port, () => {
    createRabbitConnection()
    console.log(`app listening at http://localhost:${port}`);
});

