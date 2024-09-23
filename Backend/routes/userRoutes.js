const express = require('express')
const router = express.Router()

// controller functions
const { RegisterUser , LoginUser ,GetME } = require('../controller/userController')

// authorization midlleware 
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(RegisterUser)

router.route('/login').post(LoginUser)

router.route('/me').get(protect , GetME)   // protected


module.exports = router