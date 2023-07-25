// controllers/user.js
const User = require('../models/user');

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

    await User.create({ name, email, password });
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to create user' });
  }
};

exports.getLogin = (req, res) => {
  res.sendFile('login.html', { root: './views' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).send({ message: 'User not authorized' });
    }

    res.send({ message: 'User login successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Login failed' });
  }
};
