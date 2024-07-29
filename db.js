const mongoose = require('mongoose')

// mongodb url connection

const mongoURl = "mongodb://localhost:27017/hotel"

// set up mongodb connection

mongoose.connect(mongoURl,{
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
