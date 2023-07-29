const express = require('express')
const { signup, signin } = require('../controllers/authController')
const router = express.Router()

//Auth routes

//SignUp route
router.post('/signup', signup);
//SignIn route
router.post('/signin', signin)

module.exports = router;