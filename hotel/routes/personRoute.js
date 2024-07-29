const express = require('express')
const router = express.Router();
const Person = require('./../models/person')


router.post('/person',async (req,res) => {
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

  router.get('/person',async (req,res) =>{

    try {
      const data = await Person.find();
      console.log("data fetched")
      res.status(200).json(data)
    
    } catch (error) {
      console.log(err)
        res.status(500).json(err,"internal server error")
    }
    })

    router.get('/person/:workType', async (req,res) => {
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