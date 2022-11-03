const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User =require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //getting token from header
            token = req.headers.authorization.split(' ')[1]

            //verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //getting the user from the token via the user id
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, No token')
    }
})
 


module.exports = { protect}