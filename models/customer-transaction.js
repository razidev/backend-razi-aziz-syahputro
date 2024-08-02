const Sequlize = require('sequelize');
const sequelize = require('../middlewares/database');

const CustomerTransaction = sequelize.define('customer-transactions', {
    id: {
        type: Sequlize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_name: {
        type: Sequlize.STRING,
        allowNull: false
    },
    product_name: {
        type: Sequlize.STRING,
        allowNull: false
    },
    free_shipping: {
        type: Sequlize.TINYINT,
        defaultValue: 0,
        allowNull: false
    },
    normal_price: {
        type: Sequlize.FLOAT,
        allowNull: false
    },
    discount_price: {
        type: Sequlize.FLOAT,
        defaultValue: 0,
        allowNull: false
    },
    price: {
        type: Sequlize.FLOAT,
        allowNull: false
    }
});

module.exports = CustomerTransaction;
