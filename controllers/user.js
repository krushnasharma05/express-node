const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getSignup = (req, res) => {
  res.sendFile('signup.html', { root: './views' });
};

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const saltRounds = 10; // Number of salt rounds for bcrypt

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({ name, email, password: hashedPassword });

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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Password does not match' });
    }

    res.send({ message: 'User login successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Login failed' });
  }
};
