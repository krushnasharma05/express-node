const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Admin routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Shop routes
const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

// 404 error handling
app.use(errorController.get404);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
