const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Serve the login.html page
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views' });
});

// Handle the login form submission
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Incorrect password' });
    }

    // If login is successful, redirect to the expense page
    res.redirect('/expense');
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Login failed' });
  }
});

// Serve the expense.html page
router.get('/expense', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

module.exports = router;
