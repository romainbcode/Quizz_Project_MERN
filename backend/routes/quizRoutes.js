const express = require('express');
const { createQuiz, showQuizs, showSingleQuiz } = require('../controllers/quizController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router()

//Quiz routes

//Create quiz route
router.post('/quiz/create',createQuiz);// isAuthenticated, isAdmin, createQuiz);
//Show all quizs route
router.get('/quizs/show', showQuizs);
//Show on quiz route
router.get('/quiz/show/:id', showSingleQuiz)

module.exports = router;