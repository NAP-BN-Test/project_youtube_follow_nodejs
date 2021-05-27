var mtblNotification = require('../api/tables/tblNotification')
var mtblAccount = require('../api/tables/tblAccount')

module.exports = {
    sockketIO: async(io) => {
        io.on("connection", async function(socket) {
            console.log(123456);
            socket.on("withdrawal-notice-score", async function(data) {
                console.log(1234567);

                let array = []
                let tblNotification = mtblNotification(db);
                tblNotification.belongsTo(mtblAccount(db), { foreignKey: 'UserID', sourceKey: 'UserID', as: 'user' })
                await tblNotification.findAll({
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
                            userID: element.UserID ? element.UserID : null,
                            userName: element.UserID ? element.user.Name ? element.user.Name : '' : '',
                            email: element.UserID ? element.user.Email ? element.user.Email : '' : '',
                            score: element.Score ? element.Score : null,
                        })
                    });
                })
                console.log('-----------------------', array);

                io.sockets.emit("withdrawal-notice-score", array);
            });
        })
    }
}