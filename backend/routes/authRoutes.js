const express = require('express')
const { signup } = require('../controllers/authController')
const router = express.Router()

//Auth routes

//SignUp route
router.post('/signup', signup);

module.exports = router;