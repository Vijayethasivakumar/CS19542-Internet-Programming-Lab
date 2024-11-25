const express = require('express');
const router = express.Router();

const loginDetails = require('../models/login')


// Create a new User/Admin
router.post('/', async(req, res) => {
    const login = new loginDetails({
        userName: req.body.userName, 
        password:  req.body.password, 
        isAdmin:  req.body.isAdmin, 
    });

    try {
        const newLogin = await login.save();
        res.status(201).json(newLogin);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


// Login By UserID
router.post('/getLogin', async(req, res) => {
    const { userName, password } = req.body;
    console.log('Request Body:', userName);
    console.log('Request Body:', password);
    try {
        
        const loginDetail = await loginDetails.findOne({ userName: userName });;
        if (!loginDetail) {
            return res.status(404).json({message: "User not found"});
        }
        if (loginDetail.password != password)
        {
            return res.status(404).json({message: "Password Invalid"});
        }
        res.json(loginDetail.isAdmin);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

});

module.exports = router;