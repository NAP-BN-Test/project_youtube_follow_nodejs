const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblAccount = require('../tables/tblAccount')
var database = require('../database');
var mtblHistoryReviewVideo = require('../tables/tblHistoryReviewVideo')

async function deleteRelationshiptblAccount(db, listID) {
    await mtblAccount(db).destroy({
        where: {
            ID: {
                [Op.in]: listID
            }
        }
    })
}
module.exports = {

    deleteRelationshiptblAccount,
    //  get_detail_tbl_account
    detailtblAccount: (req, res) => {
        let body = req.body;
        console.log(body);
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblAccount(db).findOne({ where: { ID: body.id } }).then(data => {
                        if (data) {
                            var obj = {
                                id: Number(data.ID),
                                userName: data.UserName ? data.UserName : '',
                                password: data.Password ? data.Password : '',
                                permission: data.Permission ? data.Permission : '',
                                Active: data.Active ? data.Active : '',
                                userID: data.UserID ? data.UserID : '',
                                name: data.Name ? data.Name : '',
                                email: data.Email ? data.Email : '',
                                urlImage: data.UrlImage ? data.UrlImage : '',
                                score: data.Score ? data.Score : 0,
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
    // add_tbl_account
    addtblAccount: (req, res) => {
        let body = req.body;
        console.log(body);
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let check = await mtblAccount(db).findOne({
                        where: { Email: body.email }
                    })
                    if (check) {
                        let dataResult = {
                            name: check.name ? check.name : '',
                            urlImage: check.UrlImage ? check.UrlImage : '',
                            email: check.Email ? check.Email : '',
                            id: check.ID ? check.ID : '',
                            permission: check.Permission ? check.Permission : ''
                        }
                        var result = {
                            data: dataResult,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                        }
                        res.json(result);
                    } else {
                        mtblAccount(db).create({
                            UserName: body.userName ? body.userName : '',
                            Name: body.name ? body.name : '',
                            Email: body.email ? body.email : '',
                            Password: body.password ? body.password : '',
                            Permission: '1',
                            Active: true,
                            UserID: body.userID ? body.userID : '',
                            UrlImage: body.photo ? body.photo : '',
                            Score: 0,
                        }).then(data => {
                            let dataResult = {
                                name: data.name ? data.name : '',
                                urlImage: data.UrlImage ? data.UrlImage : '',
                                email: data.Email ? data.Email : '',
                                id: data.ID ? data.ID : '',
                                permission: data.Permission ? data.Permission : ''
                            }
                            var result = {
                                data: dataResult,
                                status: Constant.STATUS.SUCCESS,
                                message: Constant.MESSAGE.ACTION_SUCCESS,
                            }
                            res.json(result);
                        })
                    }

                } catch (error) {
                    console.log(error);
                    res.json(Result.SYS_ERROR_RESULT)
                }
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    // update_tbl_account
    updatetblAccount: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.userName || body.userName === '')
                        update.push({ key: 'UserName', value: body.userName });
                    if (body.name || body.name === '')
                        update.push({ key: 'Name', value: body.name });
                    if (body.email || body.email === '')
                        update.push({ key: 'Email', value: body.email });
                    if (body.password || body.password === '')
                        update.push({ key: 'Password', value: body.password });
                    if (body.permission || body.permission === '')
                        update.push({ key: 'Permission', value: body.permission });
                    if (body.active || body.active === '')
                        update.push({ key: 'Active', value: body.active });
                    database.updateTable(update, mtblAccount(db), body.id).then(response => {
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
    // delete_tbl_account
    deletetblAccount: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    // let listID = JSON.parse(body.listID);
                    let listID = [];
                    listID.push(body.id)
                    await deleteRelationshiptblAccount(db, listID);
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
    // get_list_tbl_account
    getListtblAccount: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    var whereOjb = [];
                    // if(body.dataSearch){
                    // var data = JSON.parse(body.dataSearch)

                    // if (data.search) {
                    //     where = [
                    //         { FullName: { [Op.like]: '%' + data.search + '%' } },
                    //         { Address: { [Op.like]: '%' + data.search + '%' } },
                    //         { CMND: { [Op.like]: '%' + data.search + '%' } },
                    //         { EmployeeCode: { [Op.like]: '%' + data.search + '%' } },
                    //     ];
                    // } else {
                    //     where = [
                    //         { FullName: { [Op.ne]: '%%' } },
                    //     ];
                    // }
                    // whereOjb = {
                    //     [Op.and]: [{ [Op.or]: where }],
                    //     [Op.or]: [{ ID: { [Op.ne]: null } }],
                    // };
                    // if (data.items) {
                    //     for (var i = 0; i < data.items.length; i++) {
                    //         let userFind = {};
                    //         if (data.items[i].fields['name'] === 'HỌ VÀ TÊN') {
                    //             userFind['FullName'] = { [Op.like]: '%' + data.items[i]['searchFields'] + '%' }
                    //             if (data.items[i].conditionFields['name'] == 'And') {
                    //                 whereOjb[Op.and].push(userFind)
                    //             }
                    //             if (data.items[i].conditionFields['name'] == 'Or') {
                    //                 whereOjb[Op.or].push(userFind)
                    //             }
                    //             if (data.items[i].conditionFields['name'] == 'Not') {
                    //                 whereOjb[Op.not] = userFind
                    //             }
                    //         }
                    //     }
                    // }
                    //  }
                    let stt = 1;
                    mtblAccount(db).findAll({
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
                                userName: element.UserName ? element.UserName : '',
                                password: element.Password ? element.Password : '',
                                permission: element.Permission ? element.Permission : '',
                                Active: element.Active ? element.Active : '',
                                userID: element.UserID ? element.UserID : '',
                                name: element.Name ? element.Name : '',
                                email: element.Email ? element.Email : '',
                                urlImage: element.UrlImage ? element.UrlImage : '',
                                score: element.Score ? element.Score : 0,
                            }
                            array.push(obj);
                            stt += 1;
                        });
                        var count = await mtblAccount(db).count({ where: whereOjb, })
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
    // get_list_name_tbl_account
    getListNametblAccount: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblAccount(db).findAll().then(data => {
                        var array = [];
                        data.forEach(element => {
                            var obj = {
                                id: Number(element.ID),
                                userName: element.UserName ? element.UserName : '',
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
    // plus_score_for_staff
    plusScoreForStaff: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let history = await mtblHistoryReviewVideo(db).findOne({
                        where: {
                            UserID: body.userID,
                            VideoID: body.videoID
                        }
                    })
                    if (history) {
                        await mtblHistoryReviewVideo(db).update({
                            UserViews: history.UserViews + 1
                        }, {
                            where: { ID: history.ID }
                        })
                    }
                    let pastAccount = await mtblAccount(db).findOne({
                        where: { ID: body.userID }
                    })
                    if (pastAccount) {
                        await mtblAccount(db).update({
                            Score: pastAccount.Score + 1,
                        }, {
                            where: { ID: body.userID }
                        })
                    }
                    var result = {
                        obj: {
                            Score: pastAccount.Score + 1,

                        },
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
    // minus_points_of_staff
    minusPointsOfStaff: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let pastAccount = await mtblAccount(db).findOne({
                        where: { ID: body.userID }
                    })
                    if (pastAccount && body.score) {
                        if (Number(body.score) < pastAccount.Score) {
                            await mtblAccount(db).update({
                                Score: pastAccount.Score - Number(body.score),
                            }, {
                                where: { ID: body.userID }
                            })
                            var result = {
                                obj: {
                                    Score: pastAccount.Score + 1,
                                },
                                status: Constant.STATUS.SUCCESS,
                                message: Constant.MESSAGE.ACTION_SUCCESS,
                            }
                        } else {
                            var result = {
                                obj: {},
                                status: Constant.STATUS.FAIL,
                                message: '',
                            }
                        }

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