const bcrypt = require('bcrypt');
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

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

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
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Incorrect password' });
    }

    res.send({ message: 'Logged in successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Login failed' });
  }
};
