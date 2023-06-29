const express = require("express");
const cors = require('cors');
const user = require('./database');

const path = require('path');
const filePath = path.join(__dirname, '..', 'view.html');

const sequelize = require('sequelize');
const sq = new sequelize('node', 'root', 'Krushna@123', {
  dialect: 'mysql',
  host: 'localhost'
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/saveUser', async (req, res, next) => {
  const { name, phone, email } = req.body;
  try {
    const data = await user.create({ name, phone, email });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/getUser', async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.patch('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  try {
    const updateUser = await user.findByPk(id);
    if (!updateUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    updateUser.name = name;
    updateUser.phone = phone;
    updateUser.email = email;
    await updateUser.save();
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await user.destroy({ where: { id } });
    if (deletedUser === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

user.sync()
  .then(() => {
    app.get('/', (req, res) => {
      res.sendFile(filePath);
    });

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.log(err));
