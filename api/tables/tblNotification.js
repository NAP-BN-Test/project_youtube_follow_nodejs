const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblNotification', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: Sequelize.BIGINT,
        Score: Sequelize.FLOAT,
        Status: Sequelize.BOOLEAN

    });

    return table;
}