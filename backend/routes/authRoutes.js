const express = require('express')
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router()

//Auth routes

//SignUp route
router.post('/signup', signup);
//SignIn route
router.post('/signin', signin)
//LogOut route
router.get('/logout', logout)
//GetUser route
router.get('/me', isAuthenticated, userProfile)

module.exports = router;