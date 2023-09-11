// Create a new file routes/expense.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// Handle POST requests to add an expense
router.post('/add', async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    // Create a new expense record in the database
    await Expense.create({ amount, description, category });

    res.status(201).send({ message: 'Expense added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to add expense' });
  }
});

// Add a route to fetch expenses
router.get('/fetch', async (req, res) => {
    try {
      // Fetch all expenses from the database
      const expenses = await Expense.findAll();
      res.json(expenses);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to fetch expenses' });
    }
  });

  // routes/expense.js

// Add a route to delete an expense by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the expense by ID and delete it
      const deletedExpense = await Expense.findByPk(id);
      if (!deletedExpense) {
        return res.status(404).send({ message: 'Expense not found' });
      }
  
      await deletedExpense.destroy();
  
      res.status(200).send({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Failed to delete expense' });
    }
  });
          

module.exports = router;
