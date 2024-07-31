const mongoose = require('mongoose')
require('dotenv').config();
// mongodb url connection

// const mongoURL = "mongodb://localhost:27017/hotel"
    const mongoURL = process.env.MONGODB_URL;
// set up mongodb connection

mongoose.connect(mongoURL,{
})

// mongoose maintains a default connection object representing the mongodb connection

const db = mongoose.connection;

db.on('connected',() => {
    console.log("connected to mongodb server");
})

db.on('error',(err) => {
    console.log("mongodb connection error",err);
})

db.on('disconnected',() => {
    console.log("mongodb disconnected")
})

module.exports = db;
