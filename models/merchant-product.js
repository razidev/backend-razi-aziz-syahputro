const Sequlize = require('sequelize');
const sequelize = require('../middlewares/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequlize.STRING,
        allowNull: false
    },
    price: {
        type: Sequlize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequlize.INTEGER,
        allowNull: false
    }
});

module.exports = Product;
