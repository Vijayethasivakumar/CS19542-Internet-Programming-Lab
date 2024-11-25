const express = require('express');
const router = express.Router();

const DailyMenuDetails = require('../models/DailyMenu');

// Get All DailyMenu
router.get('/', async(req, res) => {
    try {
        const DailyMenu_Details = await DailyMenuDetails.find();
        res.json(DailyMenu_Details);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Get a single DailyMenu by ID
router.get('/:id', async(req, res) => {
    try {
        const dailyMenuDetail = await DailyMenuDetails.findById(req.params.id);
        if (!dailyMenuDetail) {
            return res.status(404).json({message: "Menu not found"});
        }
        res.json(dailyMenuDetail);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

});

// Create a new Menu
router.post('/', async(req, res) => {
    const dailyMenu = new DailyMenuDetails({
        menuType: req.body.menuType, 
        menuName:  req.body.menuName, 
        image:  req.body.image, 
    });

    try {
        const newMenu = await dailyMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


// update an existing Menu
router.put('/:id', async(req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body.menuType);
        console.log(req.body.menuName);
        const dailyMenu = await DailyMenuDetails.findById(req.params.id);
        if (!dailyMenu) {
            return res.status(404).json({message: "Menu not found"});
        }

        dailyMenu.menuType = req.body.menuType || dailyMenu.menuType;
        dailyMenu.menuName = req.body.menuName || dailyMenu.menuName;
        dailyMenu.image = req.body.image || dailyMenu.image;
        dailyMenu.updatedAt = Date.now();

        const updatedMenu = await dailyMenu.save();
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Delete a menu
router.delete('/:id', async(req, res) => {
    try {
        const dailyMenu = await DailyMenuDetails.findById(req.params.id);
        if (!dailyMenu) {
            return res.status(404).json({message: "Menu not found"});
        }

        await DailyMenuDetails.findByIdAndDelete(dailyMenu._id)
        res.json({message: "Menu deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;