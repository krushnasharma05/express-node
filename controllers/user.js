const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getSignup = (req, res) => {
  res.sendFile('signup.html', { root: './views' });
};


exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    await User.create({ name, email, password: hashedPassword, isPremiumUser: false });

    res.sendFile('login.html', { root: './views' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to create user' });
  }
};

exports.getLogin = (req, res) => {
  res.sendFile('login.html', { root: './views' });
};

exports.getExpenses = (req, res) => {
  res.sendFile('expense.html', { root: './views' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the input password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Incorrect password' });
    }

    // If the login is successful, return a JWT token and check for premium user status
    const token = jwt.sign(existingUser.id, 'secretkey');
    res.json({ userId: token, message: 'Logged in successfully', isPremiumUser: existingUser.isPremiumUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Login failed' });
  }
};
