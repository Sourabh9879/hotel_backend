const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('welcome to mode restaurant')
})

app.listen(3000,()=>{
  console.log("server running on port 3000");
})