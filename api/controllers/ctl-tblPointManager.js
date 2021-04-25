const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblPointManager = require('../tables/tblPointManager')
var database = require('../database');
async function deleteRelationshiptblPointManager(db, listID) {
    await mtblPointManager(db).destroy({
        where: {
            ID: { [Op.in]: listID }
        }
    })
}
module.exports = {
    deleteRelationshiptblPointManager,
    //  get_detail_tbl_point_manager
    detailtblPointManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblPointManager(db).findOne({ where: { ID: body.id } }).then(data => {
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
    // add_tbl_point_manager
    addtblPointManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblPointManager(db).create({
                        TotalPoint: body.totalPoint ? body.totalPoint : null,
                        IDUser: body.userID ? body.userID : null,
                        PlusPoints: body.plusPoints ? body.plusPoints : null,
                        MinusPoints: body.minusPoints ? body.minusPoints : null,
                        Reason: body.reason ? body.reason : null,
                        IDVideoView: body.videoViewID ? body.videoViewID : null,
                        ViewDuration: body.viewDuration ? body.viewDuration : null,
                        CreateDate: body.createDate ? body.createDate : null,
                        EditDate: body.editDate ? body.editDate : null,
                        StartTime: body.startTime ? body.startTime : null,
                        EndTime: body.endTime ? body.endTime : null,
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
    // update_tbl_point_manager
    updatetblPointManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.reason || body.reason === '')
                        update.push({ key: 'Reason', value: body.reason });
                    if (body.totalPoint || body.totalPoint === '') {
                        if (body.totalPoint === '')
                            update.push({ key: 'TotalPoint', value: null });
                        else
                            update.push({ key: 'TotalPoint', value: body.totalPoint });
                    }
                    if (body.userID || body.userID === '') {
                        if (body.userID === '')
                            update.push({ key: 'IDUser', value: null });
                        else
                            update.push({ key: 'IDUser', value: body.userID });
                    }
                    if (body.plusPoints || body.plusPoints === '') {
                        if (body.plusPoints === '')
                            update.push({ key: 'PlusPoints', value: null });
                        else
                            update.push({ key: 'PlusPoints', value: body.plusPoints });
                    }
                    if (body.minusPoints || body.minusPoints === '') {
                        if (body.minusPoints === '')
                            update.push({ key: 'MinusPoints', value: null });
                        else
                            update.push({ key: 'MinusPoints', value: body.minusPoints });
                    }
                    if (body.videoViewID || body.videoViewID === '') {
                        if (body.videoViewID === '')
                            update.push({ key: 'IDVideoView', value: null });
                        else
                            update.push({ key: 'IDVideoView', value: body.videoViewID });
                    }
                    if (body.viewDuration || body.viewDuration === '') {
                        if (body.viewDuration === '')
                            update.push({ key: 'ViewDuration', value: null });
                        else
                            update.push({ key: 'ViewDuration', value: body.viewDuration });
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
                    if (body.startTime || body.startTime === '') {
                        if (body.startTime === '')
                            update.push({ key: 'StartTime', value: null });
                        else
                            update.push({ key: 'StartTime', value: body.startTime });
                    }
                    if (body.endTime || body.endTime === '') {
                        if (body.endTime === '')
                            update.push({ key: 'EndTime', value: null });
                        else
                            update.push({ key: 'EndTime', value: body.endTime });
                    }
                    database.updateTable(update, mtblPointManager(db), body.id).then(response => {
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
    // delete_tbl_point_manager
    deletetblPointManager: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshiptblPointManager(db, listID);
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
    // get_list_tbl_point_manager
    getListtblPointManager: (req, res) => {
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
                    mtblPointManager(db).findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        where: whereOjb,
                        order: [
                            ['ID', 'DESC']
                        ],
                    }).then(async data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                stt: stt,
                                id: Number(element.ID),
                                totalPoint: element.TotalPoint ? element.TotalPoint : '',
                                userID: element.IDUser ? element.IDUser : '',
                                plusPoints: element.PlusPoints ? element.PlusPoints : '',
                                minusPoints: element.MinusPoints ? element.MinusPoints : '',
                                reason: element.Reason ? element.Reason : '',
                                videoViewID: element.IDVideoView ? element.IDVideoView : '',
                                viewDuration: element.ViewDuration ? element.ViewDuration : '',
                                createDate: element.CreateDate ? element.CreateDate : '',
                                editDate: element.EditDate ? element.EditDate : '',
                                startTime: element.StartTime ? element.StartTime : '',
                                endTime: element.EndTime ? element.EndTime : '',
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mtblPointManager(db).count({ where: whereOjb, })
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
}