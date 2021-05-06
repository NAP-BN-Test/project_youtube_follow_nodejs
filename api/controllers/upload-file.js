const Constant = require('../constants/constant');
var database = require('../database');
const fs = require('fs');

module.exports = {
    converBase64ToImg: (req, res) => {
        let body = req.body;
        var base64Data = body.data.replace('data:image/jpeg;base64,', "");
        base64Data = base64Data.replace(/ /g, '+');
        var buf = new Buffer.from(base64Data, "base64");
        var numberRandom = Math.floor(Math.random() * 1000000);
        nameMiddle = numberRandom.toString();
        var dir = 'photo-' + nameMiddle + '.jpg';
        require("fs").writeFile('C:/images_services/ageless_sendmail/' + dir, buf, function (err) {
            if (err) console.log(err + '');
        });
        var result = {
            link: 'http://103.154.100.26:1357/ageless_sendmail/' + dir,
            name: body.data.name,
            status: Constant.STATUS.SUCCESS,
            message: Constant.MESSAGE.ACTION_SUCCESS,
        }
        res.json(result);
    },
    deletetblFileFromLink: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var file = body.link.replace("http://103.154.100.26:1357/ageless_sendmail/", "")
                    fs.unlink("C:/images_services/ageless_sendmail/" + file, (err) => {
                        if (err) console.log(err);
                    });
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
}