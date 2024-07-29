const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./models/person')
const MenuItem = require('./models/menu')

const bodyParser = require('body-parser')
const person = require('./models/person')
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('welcome to mode restaurant')
})
// person post method
app.post('/person',async (req,res) => {
  try{
    const data = req.body;
    const newPerson = new Person(data);
  
    const response = await newPerson.save()
      console.log("data saved")
      res.status(200).json(response);
      
   }catch(err){
    console.log(err)
    res.status(500).json(err,"internal server error")
  }
})
// person get method
app.get('/person',async (req,res) =>{

try {
  const data = await Person.find();
  console.log("data fetched")
  res.status(200).json(data)

} catch (error) {
  console.log(err)
    res.status(500).json(err,"internal server error")
}
})
// menu post method
app.post('/menu', async (req,res) => {
  try{
    const data = req.body;
    const menu = new MenuItem(data);
  
    const response = await menu.save()
      console.log("data saved")
      res.status(200).json(response);
      
   }catch(err){
    console.log(err)
    res.status(500).json(err,"internal server error")
  }
})
// menu get method
app.get('/menu', async (req,res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched")
    res.status(200).json(data)
  
  } catch (error) {
    console.log(err)
      res.status(500).json(err,"internal server error")
  }
})

app.get('/person/:workType', async (req,res) => {
  try {
// it will extract work from URL parameter
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({work:workType})
      console.log("response fetched")
      res.status(200).json(response)
      
    } else {
      res.status(404).json({error :"server error"})
    }
    
  } catch (error) {
    console.log(err)
    res.status(500).json(err,"internal server error")
  }
})

app.listen(3000,()=>{
  console.log("server running on port 3000");
})