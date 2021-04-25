const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblUser', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Email: Sequelize.STRING,
        IDApple: Sequelize.BIGINT,
        IDAccount: Sequelize.BIGINT,
    });

    return table;
}