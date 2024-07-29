const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItem')


router.post('/', async (req,res) => {
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
  router.get('/', async (req,res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched")
      res.status(200).json(data)
    
    } catch (error) {
      console.log(err)
        res.status(500).json(err,"internal server error")
    }
  })

  router.get('/:tasteType', async (req,res) => {
    try {
  // it will extract work from URL parameter
      const tasteType = req.params.tasteType;
      if (tasteType == 'spice' || tasteType == 'sweet' || tasteType == 'sour') {
        const response = await MenuItem.find({taste:tasteType})
        console.log("response fetched")
        res.status(200).json(response)
        
      } else {
        res.status(404).json({error :"server error"})
      }
      
    } catch (err) {
      console.log(err)
      res.status(500).json({error:"internal server error"})
    }
  })


  module.exports = router;