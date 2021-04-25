const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblChanelManager', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.STRING,
        Code: Sequelize.STRING,
        CreateDate: Sequelize.DATE,
        EditDate: Sequelize.DATE

    });

    return table;
}