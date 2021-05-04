const Constant = require('../constants/constant');
const Op = require('sequelize').Op;
const Result = require('../constants/result');
var moment = require('moment');
var mtblHistoryReviewVideo = require('../tables/tblHistoryReviewVideo')
var database = require('../database');
var mtblVideoManager = require('../tables/tblVideoManager')
var mtblAccount = require('../tables/tblAccount')

async function deleteRelationshiptblHistoryReviewVideo(db, listID) {
    await mtblHistoryReviewVideo(db).destroy({
        where: {
            ID: { [Op.in]: listID }
        }
    })
}
module.exports = {
    deleteRelationshiptblHistoryReviewVideo,
    // add_tbl_history_review_video
    addtblHistoryReviewVideo: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    mtblHistoryReviewVideo(db).create({
                        VideoID: body.videoID ? body.videoID : null,
                        UserID: body.userID ? body.userID : null,
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
    // update_tbl_history_review_video
    updatetblHistoryReviewVideo: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let update = [];
                    if (body.userID || body.userID === '')
                        update.push({ key: 'UserID', value: body.userID });
                    if (body.videoID || body.videoID === '')
                        update.push({ key: 'VideoID', value: body.videoID });
                    database.updateTable(update, mtblHistoryReviewVideo(db), body.id).then(response => {
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
    // delete_tbl_history_review_video
    deletetblHistoryReviewVideo: (req, res) => {
        let body = req.body;
        database.connectDatabase().then(async db => {
            if (db) {
                try {
                    let listID = JSON.parse(body.listID);
                    await deleteRelationshiptblHistoryReviewVideo(db, listID);
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
    // get_history_review_video_of_staff
    getHistoryReviewVideoOfStaff: (req, res) => {
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
                    mtblHistoryReviewVideo(db).findAll({
                        offset: Number(body.itemPerPage) * (Number(body.page) - 1),
                        limit: Number(body.itemPerPage),
                        where: whereOjb,
                        order: [
                            ['ID', 'DESC']
                        ],
                    }).then(async data => {
                        var array = [];
                        for (var history = 0; history < data.length; history++) {
                            let videoDetail = await mtblVideoManager(db).findOne({
                                VideoID: data[history].VideoID
                            })
                            let userDetail = await mtblAccount(db).findOne({
                                UserID: data[history].UserID
                            })
                            var obj = {
                                stt: stt,
                                id: Number(data[history].ID),
                                videoID: data[history].VideoID ? data[history].VideoID : '',
                                nameVideo: videoDetail.Name ? videoDetail.Name : '',
                                titleVideo: videoDetail.Title ? videoDetail.Title : '',
                                descriptionVideo: videoDetail.Description ? videoDetail.Description : '',
                                linkImage: videoDetail.LinkImage ? videoDetail.LinkImage : '',
                                userID: data[history].UserID ? data[history].UserID : '',
                                userName: userDetail.UserName ? userDetail.UserName : '',
                                permission: userDetail.Permission ? userDetail.Permission : '',
                            }
                            array.push(obj);
                            stt += 1;
                        }
                        var count = await mtblHistoryReviewVideo(db).count({ where: whereOjb, })
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