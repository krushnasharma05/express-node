const express = require('express');
const router = express.Router();

const userController =require('../controllers/user');

// Serve the login.html page
router.get('/login', userController.getLogin);
router.get('/signup', userController.getSignup);

// Handle the login form submission
router.post('/login',userController.postLogin);
router.post('/signup',userController.postSignup);

// Serve the expense.html page
router.get('/expense', userController.getExpenses);

module.exports = router; 