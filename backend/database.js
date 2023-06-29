const sequelize = require('sequelize');

const sq = new sequelize('node', 'root', 'Krushna@123', {
  dialect: 'mysql',
  host: 'localhost'
});

const user = sq.define('user', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: sequelize.BIGINT,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false
  }
});

module.exports = user;
