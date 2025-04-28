import express from "express"
import mongoose from "mongoose"
import Review from "../model/reviews.js"
import review from "../model/reviews.js"

const router = express.Router()

router.post('/:bookname', async (req, res) => {
    const { bookname } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newReview = new Review({
            book: bookname,
            user,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (err) {
        res.status(500).json({ message: "Failed to add review", error: err.message });
    }

})

router.get('/getreview/:bookname', async (req, res) => {
    const { bookname } = req.params
    try {
        const reviews = await Review.find({ book: bookname });
        console.log(review)

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this book." });
        }

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
    }
})

router.get('/:user', async (req, res) => {
    const { user } = req.params
    console.log(user)

    try {
        const reviews = await Review.find({ user })

        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this user." })
        }

        res.status(200).json({ reviews })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reviews", error: error.message })
    }
});


export default router