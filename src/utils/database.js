const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
