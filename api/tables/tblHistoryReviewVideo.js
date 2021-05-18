const Sequelize = require('sequelize');

module.exports = function(db) {
    var table = db.define('tblHistoryReviewVideo', {
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: Sequelize.STRING,
        VideoID: Sequelize.STRING,
        ReviewDate: Sequelize.NOW
    });

    return table;
}