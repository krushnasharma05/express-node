const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Krushna@123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize; 