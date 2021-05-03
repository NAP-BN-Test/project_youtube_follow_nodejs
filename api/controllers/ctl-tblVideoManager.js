const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblVideoManager = require('../tables/tblVideoManager')
var mtblchannelManager = require('../tables/tblchannelManager')

var database = require('../database');
async function deleteRelationshiptblVideoManager(db, listID) {
    await mtblVideoManager(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {
    deleteRelationshiptblVideoManager,
    //  get_detail_tbl_video_manager
    detailtblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblVideoManager(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: data.ID,
                                name: data.Name,
                                code: data.Code,
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
    // add_tbl_video_manager
    addtblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblVideoManager(db).create({
                        Name: body.name ? body.name : '',
                        ViewVideo: body.viewVideo ? body.viewVideo : null,
                        Likes: body.likes ? body.likes : null,
                        CreateDate: body.createDate ? body.createDate : null,
                        EditDate: body.editDate ? body.editDate : null,
                        Type: body.type ? body.type : '',
                        Status: body.status ? body.status : '',
                        Duration: body.duration ? body.duration : null,
                        IDchannel: body.channelID ? body.channelID : null,
                        VideoID: body.videoID ? body.videoID : null,
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
    // update_tbl_video_manager
    updatetblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.name || body.name === '')
                        update.push({ key: 'Name', value: body.name });
                    if (body.title || body.title === '')
                        update.push({ key: 'Title', value: body.title });
                    if (body.viewVideo || body.viewVideo === '') {
                        if (body.viewVideo === '')
                            update.push({ key: 'ViewVideo', value: null });
                        else
                            update.push({ key: 'ViewVideo', value: body.viewVideo });
                    }
                    if (body.likes || body.likes === '') {
                        if (body.likes === '')
                            update.push({ key: 'Likes', value: null });
                        else
                            update.push({ key: 'Likes', value: body.likes });
                    }
                    if (body.createDate || body.createDate === '') {
                        if (body.createDate === '')
                            update.push({ key: 'CreateDate', value: null });
                        else
                            update.push({ key: 'CreateDate', value: body.createDate });
                    }
                    if (body.editDate || body.editDate === '') {
                        if (body.editDate === '')
                            update.push({ key: 'EditDate', value: null });
                        else
                            update.push({ key: 'EditDate', value: body.editDate });
                    }
                    if (body.duration || body.duration === '') {
                        if (body.duration === '')
                            update.push({ key: 'Duration', value: null });
                        else
                            update.push({ key: 'Duration', value: body.duration });
                    }
                    if (body.channelID || body.channelID === '') {
                        if (body.channelID === '')
                            update.push({ key: 'IDchannel', value: null });
                        else
                            update.push({ key: 'IDchannel', value: body.channelID });
                    }
                    if (body.type || body.type === '')
                        update.push({ key: 'Type', value: body.type });
                    if (body.status || body.status === '')
                        update.push({ key: 'Status', value: body.status });
                    database.updateTable(update, mtblVideoManager(db), body.id).then(response => {
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
    // delete_tbl_video_manager
    deletetblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshiptblVideoManager(db, listID);
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
    // get_list_tbl_video_manager
    getListtblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    // if (body.dataSearch) {
                    //     var data = JSON.parse(body.dataSearch)

                    //     if (data.search) {
                    //         where = [
                    //             { FullName: { [Op.like]: '%' + data.search + '%' } },
                    //             { Address: { [Op.like]: '%' + data.search + '%' } },
                    //             { CMND: { [Op.like]: '%' + data.search + '%' } },
                    //             { EmployeeCode: { [Op.like]: '%' + data.search + '%' } },
                    //         ];
                    //     } else {
                    //         where = [
                    //             { FullName: { [Op.ne]: '%%' } },
                    //         ];
                    //     }
                    //     whereOjb = {
                    //         [Op.and]: [{ [Op.or]: where }],
                    //         [Op.or]: [{ ID: { [Op.ne]: null } }],
                    //     };
                    //     if (data.items) {
                    //         for (var i = 0; i < data.items.length; i++) {
                    //             let userFind = {};
                    //             if (data.items[i].fields['name'] === 'HỌ VÀ TÊN') {
                    //                 userFind['FullName'] = { [Op.like]: '%' + data.items[i]['searchFields'] + '%' }
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
                    let tblVideoManager = mtblVideoManager(db);
                    tblVideoManager.belongsTo(mtblchannelManager(db), { foreignKey: 'IDchannel', sourceKey: 'IDchannel', as: 'channel' })
                    tblVideoManager.findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        where: whereOjb,
                        order: [
                            ['ID', 'DESC']
                        ],
                        include: [{
                            model: mtblchannelManager(db),
                            required: false,
                            as: 'channel'
                        }, ],
                    }).then(async data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                stt: stt,
                                id: Number(element.ID),
                                name: element.Name ? element.Name : '',
                                viewVideo: element.ViewVideo ? element.ViewVideo : null,
                                videoID: element.VideoID ? element.VideoID : null,
                                likes: element.Likes ? element.Likes : null,
                                title: element.Title ? element.Title : '',
                                createDate: element.CreateDate ? element.CreateDate : null,
                                editDate: element.EditDate ? element.EditDate : null,
                                type: element.Type ? element.Type : '',
                                status: element.Status ? element.Status : '',
                                duration: element.Duration ? element.Duration : null,
                                channelID: element.IDchannel ? element.IDchannel : '',
                                channelName: element.channel ? element.channel.Name : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mtblVideoManager(db).count({ where: whereOjb, })
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
    // get_list_name_tbl_video_manager
    getListNametblVideoManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblVideoManager(db).findAll().then(data => {
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
    },
    plusLikes: (req, res) => {
        let body = req.body;

        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let likes = await mtblVideoManager(db).findOne({ where: { VideoID: body.videoID } })
                    await mtblVideoManager(db).update({
                        Likes: likes.Likes ? likes.Likes + 1 : 1,
                    }, {
                        where: {
                            VideoID: body.videoID
                        }
                    })
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
    plusViews: (req, res) => {
        let body = req.body;

        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let viewVideo = await mtblVideoManager(db).findOne({ where: { VideoID: body.videoID } })
                    await mtblVideoManager(db).update({
                        ViewVideo: viewVideo.ViewVideo ? viewVideo.ViewVideo + 1 : 1,
                    }, {
                        where: {
                            VideoID: body.videoID
                        }
                    })
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
}