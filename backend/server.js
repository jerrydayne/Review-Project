const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/reviews', require('./routes/reviewRoutes'))

app.listen(port, () => console.log(`server running on port ${port}`))