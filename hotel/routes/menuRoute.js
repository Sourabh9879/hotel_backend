const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItem')


router.post('/menu', async (req,res) => {
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
  router.get('/menu', async (req,res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched")
      res.status(200).json(data)
    
    } catch (error) {
      console.log(err)
        res.status(500).json(err,"internal server error")
    }
  })