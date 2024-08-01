const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 const logRequest = (req,res,next) => {
   console.log(`[${new Date().toLocaleString()}] Request made through :${req.url}`);
   next();
 }
 app.use(logRequest);

 app.use(passport.initialize());
const passAuth = passport.authenticate('local', {session : false});

app.get('/',function (req, res) {
  res.send('welcome to mode restaurant')
})

const personRoute = require('./routes/personRoute')
const menuRoute = require('./routes/menuRoute')

app.use('/person' , passAuth ,personRoute)
app.use('/menu' ,menuRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("server running on port 3000");
})