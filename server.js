const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv').config();

const logRequest = (req,res,next) => {
  console.log(`Request: [${new Date().toLocaleString()}] ${req.url}`);
  next();
}
app.get('/', logRequest ,function (req, res) {
  res.send('welcome to mode restaurant')
})

const personRoute = require('./routes/personRoute')
app.use('/person',personRoute)

const menuRoute = require('./routes/menuRoute')
app.use('/menu',menuRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("server running on port 3000");
})