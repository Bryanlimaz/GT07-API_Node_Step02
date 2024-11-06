const connection = require('../config/database/connection');
const { DataTypes } = require('sequelize');

let UserModel = connection.define("users", {
    first_name: {
        type: DataTypes.STRING(50), // VARCHAR(50)
        allowNull: false // NOT NULL
    }, 
    surname: {
        type: DataTypes.STRING(50),
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

module.exports = UserModel;