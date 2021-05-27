var mtblNotification = require('../api/tables/tblNotification')
var mtblAccount = require('../api/tables/tblAccount')
var moment = require('moment');
var fs = require('fs');
var database = require('./database');
const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
module.exports = {
    sockketIO: async(io) => {
        let db = await database.connectDatabase()
        let arraySocket = []
        let tblNotification = mtblNotification(db);
        tblNotification.belongsTo(mtblAccount(db), { foreignKey: 'UserID', sourceKey: 'UserID', as: 'user' })
        await tblNotification.findAll({
            where: {
                Status: false
            },
            order: [
                ['ID', 'DESC']
            ],
            include: [{
                model: mtblAccount(db),
                required: false,
                as: 'user'
            }, ],
        }).then(data => {
            data.forEach(element => {
                arraySocket.push({
                    id: Number(element.ID),
                    userID: element.UserID ? element.UserID : null,
                    userName: element.UserID ? element.user.Name ? element.user.Name : '' : '',
                    email: element.UserID ? element.user.Email ? element.user.Email : '' : '',
                    score: element.Score ? element.Score : null,
                })
            });
        })
        io.on("connection", async function(socket) {
            socket.on("withdrawal-notice-score", async function(data) {
                let db = await database.connectDatabase()
                let array = []
                let tblNotification = mtblNotification(db);
                tblNotification.belongsTo(mtblAccount(db), { foreignKey: 'UserID', sourceKey: 'UserID', as: 'user' })
                await tblNotification.findAll({
                    where: {
                        Status: false
                    },
                    order: [
                        ['ID', 'DESC']
                    ],
                    include: [{
                        model: mtblAccount(db),
                        required: false,
                        as: 'user'
                    }, ],
                }).then(data => {
                    data.forEach(element => {
                        array.push({
                            id: Number(element.ID),
                            userID: element.UserID ? element.UserID : null,
                            userName: element.UserID ? element.user.Name ? element.user.Name : '' : '',
                            email: element.UserID ? element.user.Email ? element.user.Email : '' : '',
                            score: element.Score ? element.Score : null,
                        })
                    });
                })
                console.log(array);
                io.sockets.emit("withdrawal-notice-score", array);
            });
            console.log(arraySocket, 'arraySocket');
            socket.emit("withdrawal-notice-score", arraySocket);
        })
    }
}