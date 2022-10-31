
// @description Get reviews
// @routes Get /api/reviews
// @access Private
const getReviews = (req, res) => {
    res.status(200).json({ message: 'Get reviews'})
}

// @description Create review
// @routes POST /api/reviews
// @access Private
const createReview = (req, res) => {
    res.status(200).json({ message: 'Create review'})
}

// @description Update review
// @routes PUT /api/reviews/:id
// @access Private
const updateReview = (req, res) => {
    res.status(200).json({ message: `Update reviews ${req.params.id}`})
}

// @description Delete review
// @routes Delete /api/review
// @access Private
const deleteReview = (req, res) => {
    res.status(200).json({ message: `Update reviews ${req.params.id}`})
}

module.exports = {
    getReviews, 
    createReview, 
    updateReview, 
    deleteReview
}