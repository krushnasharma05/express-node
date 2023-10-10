const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const connection = require('./util/database');

const userTable = require('./models/user');
const expenseTable = require('./models/expense');
const order = require('./models/orders');


const userRoute = require('./routes/user');
const expenseRoute = require('./routes/expense');
const orderRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/user', userRoute);
app.use('/expense', expenseRoute);
app.use('/purchase', orderRoute);
app.use('/premium', premiumRoute);



userTable.hasMany(expenseTable);
expenseTable.belongsTo(userTable);

userTable.hasMany(order);
order.belongsTo(userTable);


connection.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.log(err);
  }); 