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
        password: hashedPassword,
    })

    //check if user was created, send userData else, send error message
    if(user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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
    const { email, password } = req.body

    //checking for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user credentials')
    }
    res.json({ message: 'Login User'})
})


// @description Get user data
// @routes POST /api/users/user
// @access private
const userData = asynchHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generating JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    userData
}