const sequelize = require("sequelize");

const sq = require("../util/database");


const Orders = sq.define('orders', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    paymentId : sequelize.STRING,
    orderId: sequelize.STRING,
    status:sequelize.STRING
  });

  module.exports = Orders;