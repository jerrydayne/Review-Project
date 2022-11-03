const asyncHandler = require('express-async-handler')

const Review = require('../models/reviewModel')
const User = require('../models/userModel')

// @description Get reviews
// @routes Get /api/reviews
// @access Private
const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ user: req.user.id })

    res.status(200).json(reviews)
})

// @description Create review
// @routes POST /api/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Kindly add a text field')
    }

    const review = await Review.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(review)
})

// @description Update review
// @routes PUT /api/reviews/:id
// @access Private
const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    if(!review) {
        res.status(400)
        throw new Error('Review not found')
    }

    const user = await User.findById(req.user.id)

    //check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking if the user is the owner of the review to update
    if(!review){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })


    res.status(200).json(updatedReview)
})

// @description Delete review
// @routes Delete /api/review
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)

    if(!review) {
        res.status(400)
        throw new Error('Review not found')
    }
    
    const user = await User.findById(req.user.id)

    //check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //checking if the user is the owner of the review to update
    if(!review){
        res.status(401)
        throw new Error('User not authorized')
    }

    await review.remove()


    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getReviews, 
    createReview, 
    updateReview, 
    deleteReview
}