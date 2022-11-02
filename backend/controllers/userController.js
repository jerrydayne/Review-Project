const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynchHandler = require('express-async-handler')
const User = require('../models/userModel')


// @description Register user
// @routes POST /api/users
// @access Public
const registerUser = asynchHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('kindly add all fields')
    }

    //checking if user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('This user aleady exist')
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creating the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //check if user was created, send userData else, send error message
    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @description Login user
// @routes POST  /api/reviews
// @access Public
const loginUser = asynchHandler(async (req, res) => {
    res.json({ message: 'Login User'})
})


// @description Get user data
// @routes POST /api/users/user
// @access Public
const userData = asynchHandler(async (req, res) => {
    res.json({ message: 'Display User Data'})
})



module.exports = {
    registerUser,
    loginUser,
    userData
}