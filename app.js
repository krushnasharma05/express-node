const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const connection = require('./util/database');
const userTable = require('./models/user');
const expenseTable = require('./models/expense');

const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/user', userRoute);
app.use('/expense', expenseRoute);

userTable.hasMany(expenseTable);
expenseTable.belongsTo(userTable);


connection.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  }); 