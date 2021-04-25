const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblAccount', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        UserName: Sequelize.STRING,
        Password: Sequelize.STRING,
        Permission: Sequelize.STRING,
        Active: Sequelize.BOOLEAN,

    });

    return table;
}