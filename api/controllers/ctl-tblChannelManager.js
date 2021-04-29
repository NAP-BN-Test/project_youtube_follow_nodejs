const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblchannelManager = require('../tables/tblchannelManager')
var yotube = require('./youtube')
var database = require('../database');
async function deleteRelationshiptblchannelManager(db, listID) {
    await mtblchannelManager(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshiptblchannelManager,
    //  get_detail_tbl_channel_manager
    detailtblchannelManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblchannelManager(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: data.ID,
                                name: data.Name ? data.Name : '',
                                code: data.Code ? data.Code : '',
                                editDate: data.EditDate ? data.EditDate : null,
                                createDate: data.CreateDate ? data.CreateDate : null,
                            }
                            var result = {
                                obj: obj,
                                status: Constant.STATUS.SUCCESS,
                                message: Constant.MESSAGE.ACTION_SUCCESS,
                            }
                            res.json(result);
                        } else {
                            res.json(Result.NO_DATA_RESULT)

                        }

                    })
                } catch (error) {
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // add_tbl_channel_manager
    addtblchannelManager: async (req, res) => {
        let body = req.body;
        // let detailchannel = await channelManager.getURLAvatarchannel(body.code)
        let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblchannelManager(db).create({
                        Code: body.code ? body.code : '',
                        Name: body.name ? body.name : '',
                        CreateDate: now,
                        EditDate: now,
                        // Link: detailchannel ? detailchannel : ''
                    }).then(data => {
                        var result = {
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                        }
                        res.json(result);
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // update_tbl_channel_manager
    updatetblchannelManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                    let update = [];
                    if (body.code || body.code === '')
                        update.push({ key: 'Code', value: body.code });
                    if (body.name || body.name === '')
                        update.push({ key: 'Name', value: body.name });
                    // update.push({ key: 'CreateDate', value: now });
                    update.push({ key: 'EditDate', value: now });
                    database.updateTable(update, mtblchannelManager(db), body.id).then(response => {
                        if (response == 1) {
                            res.json(Result.ACTION_SUCCESS);
                        } else {
                            res.json(Result.SYS_ERROR_RESULT);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // delete_tbl_channel_manager
    deletetblchannelManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshiptblchannelManager(db, listID);
                    var result = {
                        status: Constant.STATUS.SUCCESS,
                        message: Constant.MESSAGE.ACTION_SUCCESS,
                    }
                    res.json(result);
                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_tbl_channel_manager
    getListtblchannelManager: async (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    // if (body.dataSearch) {
                    //     var data = JSON.parse(body.dataSearch)

                    //     if (data.search) {
                    //         where = [{
                    //                 FullName: {
                    //                     [Op.like]: '%' + data.search + '%'
                    //                 }
                    //             },
                    //             {
                    //                 Address: {
                    //                     [Op.like]: '%' + data.search + '%'
                    //                 }
                    //             },
                    //             {
                    //                 CMND: {
                    //                     [Op.like]: '%' + data.search + '%'
                    //                 }
                    //             },
                    //             {
                    //                 EmployeeCode: {
                    //                     [Op.like]: '%' + data.search + '%'
                    //                 }
                    //             },
                    //         ];
                    //     } else {
                    //         where = [{
                    //             FullName: {
                    //                 [Op.ne]: '%%'
                    //             }
                    //         }, ];
                    //     }
                    //     whereOjb = {
                    //         [Op.and]: [{
                    //             [Op.or]: where
                    //         }],
                    //         [Op.or]: [{
                    //             ID: {
                    //                 [Op.ne]: null
                    //             }
                    //         }],
                    //     };
                    //     if (data.items) {
                    //         for (var i = 0; i < data.items.length; i++) {
                    //             let userFind = {};
                    //             if (data.items[i].fields['name'] === 'HỌ VÀ TÊN') {
                    //                 userFind['FullName'] = {
                    //                     [Op.like]: '%' + data.items[i]['searchFields'] + '%'
                    //                 }
                    //                 if (data.items[i].conditionFields['name'] == 'And') {
                    //                     whereOjb[Op.and].push(userFind)
                    //                 }
                    //                 if (data.items[i].conditionFields['name'] == 'Or') {
                    //                     whereOjb[Op.or].push(userFind)
                    //                 }
                    //                 if (data.items[i].conditionFields['name'] == 'Not') {
                    //                     whereOjb[Op.not] = userFind
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                    let stt = 1;
                    mtblchannelManager(db).findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        where: whereOjb,
                        order: [
                            ['ID', 'DESC']
                        ],
                    }).then(async data => {
                        var array = [];
                        for (var i = 0; i < data.length; i++) {
                            let detailchannel = await yotube.getDetailChannel(data[i].Code)
                            detailchannel['id'] = data[i].ID;
                            array.push(detailchannel)
                        }
                        var count = await mtblchannelManager(db).count({ where: whereOjb, })
                        var result = {
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                            all: count
                        }
                        res.json(result);
                    })

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // get_list_name_tbl_channel_manager
    getListNametblchannelManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblchannelManager(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                name: element.Name ? element.Name : '',
                            }
                            array.push(obj);
                        });
                        var result = {
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                        }
                        res.json(result);
                    })

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    }
}