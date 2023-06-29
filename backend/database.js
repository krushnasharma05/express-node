const sequelize = require('sequelize');

const sq = new sequelize('node', 'root', 'Krushna@123', {
    dialect: 'mysql',
    host: 'localhost'
  });


const user = sq.define('Expence', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type :sequelize.STRING,
        allowNull: false
    },
    description: {
      type: sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: sequelize.INTEGER,
      allowNull: false
    }
  });
  module.exports = user;