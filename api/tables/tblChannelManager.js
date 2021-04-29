const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblchannelManager', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.STRING,
        Code: Sequelize.STRING,
        CreateDate: Sequelize.DATE,
        EditDate: Sequelize.DATE,
        Link: Sequelize.STRING,

    });

    return table;
}