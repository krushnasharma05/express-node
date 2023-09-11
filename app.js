const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/database');
const User = require('./models/user');
const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoute);
app.use('/expense', expenseRoute);

// Serve the login.html page
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views' });
});

// Handle the login form submission
app.post('/login', async (req, res) => {
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
app.get('/expense', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

User.sync()
  .then(() => {
    console.log('User table created successfully.');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
