const express = require('express');
const { createQuiz, showQuizs } = require('../controllers/quizController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router()

//Quiz routes

//Create quiz route
router.post('/quiz/create',createQuiz);// isAuthenticated, isAdmin, createQuiz);
//Show all quizs route
router.get('/quizs/show', showQuizs);

module.exports = router;