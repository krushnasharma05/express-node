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
