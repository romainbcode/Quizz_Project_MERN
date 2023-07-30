const express = require('express');
const { createQuiz } = require('../controllers/quizController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router()

//Quiz routes

//Create quiz route
router.post('/quiz/create', isAuthenticated, isAdmin, createQuiz);

module.exports = router;