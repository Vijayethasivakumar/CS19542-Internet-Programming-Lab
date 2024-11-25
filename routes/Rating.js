const express = require('express');
const router = express.Router();
const moment = require('moment');

const RatingDetails = require('../models/Rating');


// Add New Rating
router.post('/', async(req, res) => {
    const dailyRating = new RatingDetails({
        Menuid: req.body.Menuid, 
        ratings:  req.body.ratings, 
        Comments:  req.body.Comments,
        submitedBy: 'System' 
    });

    try {
        const ratings = await dailyRating.save();
        res.status(201).json(ratings);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


// Add New Rating
router.get('/:id', async(req, res) => {
    //const dailyMenu = await RatingDetails.findOne({Menuid: req.params.id});


    try {
        const dailyMenu = await RatingDetails.find({ Menuid: req.params.id });

        const today = moment().format('YYYY-MM-DD');

        const todayRatings = dailyMenu.filter(rating => 
            moment(rating.createdAt).format('YYYY-MM-DD') === today
        );
        //console.log(todayRatings.length);
        

        if (todayRatings.length > 0) {
            // Calculate the total rating
            const totalRating = todayRatings.reduce((acc, rating) => {
                const validRating = parseFloat(rating.ratings) || 0; // Ensure rating is a number
                console.log('Valid Rating:', validRating); // Log each valid rating
                return acc + validRating;
            }, 0);

            const averageRating = totalRating / todayRatings.length;

            res.json({
                averageRating: averageRating.toFixed(2), // Round to 2 decimal places
                ratingsCount: todayRatings.length
            });
        } else {
            // No ratings for today, return average rating as 0
            res.json({
                averageRating: 0,
                ratingsCount: 0
            });
        }


    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }

});


router.delete('/:id', async(req, res) => {
    try {
        const Rating = await RatingDetails.find({Menuid: req.params.id});
        if (!Rating) {
            return res.status(404).json({message: "Menu not found"});
        }

        await RatingDetails.deleteMany(Rating._id)
        res.json({message: "Rating deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

module.exports = router;