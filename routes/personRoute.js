const express = require('express')
const router = express.Router();
const Person = require('../models/Person')
const { jwtAuthmiddleware, generateToken } = require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    // create a new person document using the response model
    const newPerson = new Person(data);
    // save the new person to the database
    const response = await newPerson.save()
    console.log("data saved")

    const payload = {
      id: response.id,
      username: response.username
    }

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("token is : ", token);
    res.status(200).json({ response: response, token: token });

  } catch (err) {
    console.log(err)
    res.status(500).json(err, "internal server error")
  }
})

// login route

router.post('/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // generate Token 
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);

    // resturn token as response
    res.json({ token })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Profile route
router.get('/profile', jwtAuthmiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data ", userData);

    const userID = userData.id;
    const user = await Person.findById(userID);
    res.status(200).json({ user });

  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// GET method to get person
router.get('/', jwtAuthmiddleware, async (req, res) => {

  try {
    const data = await Person.find();
    console.log("data fetched")
    res.status(200).json(data)

  } catch (error) {
    console.log(err)
    res.status(500).json(err, "internal server error")
  }
})

router.get('/:workType', async (req, res) => {
  try {
    // it will extract work from URL parameter
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType })
      console.log("response fetched")
      res.status(200).json(response)

    } else {
      res.status(404).json({ error: "server error" })
    }

  } catch (error) {
    console.log(err)
    res.status(500).json(err, "internal server error")
  }
})

router.put('/:id', async (req, res) => {
  try {

    const personId = req.params.id;
    const updatedPerson = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" })
    }

    console.log("data updated")
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({ err: "internal server error" })
  }
})

router.delete('/:id', async (req, res) => {
  try {

    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)

    if (!response) {
      return res.status(404).json({ error: "Person not found" })
    }
    console.log("person deleted successfully ")
    res.status(200).json(response)

  } catch (error) {
    console.log(error)
    res.status(500).json({ err: "internal server error" })
  }
})

module.exports = router;