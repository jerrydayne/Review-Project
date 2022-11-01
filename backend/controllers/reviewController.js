const asyncHandler = require('express-async-handler')

// @description Get reviews
// @routes Get /api/reviews
// @access Private
const getReviews = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get reviews'})
})

// @description Create review
// @routes POST /api/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Create review'})
})

// @description Update review
// @routes PUT /api/reviews/:id
// @access Private
const updateReview = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update reviews ${req.params.id}`})
})

// @description Delete review
// @routes Delete /api/review
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update reviews ${req.params.id}`})
})

module.exports = {
    getReviews, 
    createReview, 
    updateReview, 
    deleteReview
}