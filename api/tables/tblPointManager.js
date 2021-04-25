const Sequelize = require('sequelize');

module.exports = function (db) {
    var table = db.define('tblPointManager', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        TotalPoint: Sequelize.FLOAT,
        IDUser: Sequelize.BIGINT,
        PlusPoints: Sequelize.FLOAT,
        MinusPoints: Sequelize.FLOAT,
        Reason: Sequelize.STRING,
        ViewDuration: Sequelize.FLOAT,
        CreateDate: Sequelize.DATE,
        EditDate: Sequelize.DATE,
        StartTime: Sequelize.NOW,
        EndTime: Sequelize.NOW

    });

    return table;
}