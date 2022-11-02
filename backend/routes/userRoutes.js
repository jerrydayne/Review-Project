const express = require('express')
const router = express.Router()
const { registerUser, loginUser, userData } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', userData)

module.exports = router 