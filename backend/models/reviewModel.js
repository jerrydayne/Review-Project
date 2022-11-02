const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' 
    },
    text: {
        type: String,
        required: [true, 'kindly add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)