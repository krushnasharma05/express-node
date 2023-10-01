const express = require('express');

const expenseController = require('../controllers/expense');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Handle POST requests to add an expense
router.post('/add', authMiddleware.auth,expenseController.postExpense);



// Add a route to fetch expenses
router.get('/fetch', authMiddleware.auth, expenseController.getExpense);

// Add a route to delete an expense by ID
router.get('/delete/:id', authMiddleware.auth, expenseController.deleteExpense);

module.exports = router;
