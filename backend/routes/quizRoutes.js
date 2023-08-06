const express = require('express');
const { createQuiz, showQuizs, showSingleQuiz, deleteQuiz, updateQuiz } = require('../controllers/quizController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const router = express.Router()

//Quiz routes

//Create quiz route
router.post('/quiz/create', isAuthenticated, isAdmin, createQuiz);// isAuthenticated, isAdmin, createQuiz);
//Show all quizs route
router.get('/quizs/show', showQuizs);
//Show on quiz route
router.get('/quiz/show/:id', showSingleQuiz)
//Delete quiz route
router.delete('/delete/quiz/:id',deleteQuiz);//isAuthenticated, isAdmin, deletePost);
//Update quiz route
router.put('/update/quiz/:id',updateQuiz);//isAuthenticated, isAdmin, deletePost);

module.exports = router;