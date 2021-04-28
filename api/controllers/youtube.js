var fs = require('fs');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var readline = require('readline');
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';
const axios = require('axios');
const Result = require('../constants/result');
const Constant = require('../constants/constant');
var moment = require('moment');
const Op = require('sequelize').Op;
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}
function getChannel(auth) {
    var service = google.youtube('v3');
    service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('No channel found.');
        } else {
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                'it has %s views.',
                channels[0].id,
                channels[0].snippet.title,
                channels[0].statistics.viewCount);
        }
    });
}
const { YoutubeDataAPI } = require("youtube-v3-api")
const API_KEY = 'AIzaSyAtCI4qXGCuc4OfZbqYPjH0QCXWFnNwCPA';
const api = new YoutubeDataAPI(API_KEY);
var search = require('youtube-search');
var ypi = require('youtube-channel-videos');
const getYoutubeChannelId = require('get-youtube-channel-id');
var mtblChanelManager = require('../tables/tblChanelManager')
var mtblVideoManager = require('../tables/tblVideoManager')
var database = require('../database');

const passport = require('passport')
async function getDetailChanel(chanelID) {
    let obj = {}
    var strUrl = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI&id='
    await axios.get(strUrl + chanelID).then(data => {
        if (data) {
            if (data.data.items.length > 0) {
                obj['channelTitle'] = data.data.items[0].snippet.title;
                obj['channelId'] = chanelID;
                obj['description'] = data.data.items[0].snippet.description;
                obj['uriImg'] = data.data.items[0].snippet.thumbnails.default.url;
            }
        }
    })
    return obj
}
async function getDetailVideo(videoID) {
    let result = {}
    var strUrl = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=20&key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI&id='
    await axios.get(strUrl + videoID).then(data => {
        if (data) {
            result = data.data.items[0]
        }
    })
    return result
}

async function getDetailTBLVideoManager(videoID, playlistID) {
    let objResult = {}
    await database.connectDatabase().then(async db => {
        if (db) {
            let objWhere = {}
            if (videoID) {
                objWhere = {
                    VideoID: videoID
                }
            } else if (playlistID) {
                objWhere = {
                    PlayListID: playlistID
                }
            } else {
                return {}
            }
            await mtblVideoManager(db).findOne({
                where: objWhere
            }).then(detailVideoManager => {
                objResult = {
                    name: detailVideoManager.Name ? detailVideoManager.Name : '',
                    viewVideo: detailVideoManager.ViewVideo ? detailVideoManager.ViewVideo : null,
                    likes: detailVideoManager.Likes ? detailVideoManager.Likes : null,
                    createDate: detailVideoManager.CreateDate ? detailVideoManager.CreateDate : null,
                    editDate: detailVideoManager.EditDate ? detailVideoManager.EditDate : null,
                    type: detailVideoManager.Type ? detailVideoManager.Type : '',
                    status: detailVideoManager.Status ? detailVideoManager.Status : '',
                    duration: detailVideoManager.Duration ? detailVideoManager.Duration : null,
                    chanelID: detailVideoManager.ChanelID ? detailVideoManager.ChanelID : null,
                    videoID: detailVideoManager.VideoID ? detailVideoManager.VideoID : null,
                    playListID: detailVideoManager.PlayListID ? detailVideoManager.PlayListID : null,
                    title: detailVideoManager.Title ? detailVideoManager.Title : '',
                    description: detailVideoManager.Description ? detailVideoManager.Description : '',
                    linkImage: detailVideoManager.LinkImage ? detailVideoManager.LinkImage : '',
                }
            })
        }
    })
    return objResult
}
module.exports = {
    getDetailVideo,
    getDetailChanel,
    youtube: (res, req) => {
        var google = require('googleapis');
        var OAuth2 = google.auth.OAuth2;
        var oauth2Client = new OAuth2(
            '799271801880-mdadv0f4rp7854rkb456fa25osspnu7c.apps.googleusercontent.com',
            'X8yPFFhHYCLwRKLmM4EoBPSC',
            'http://localhost:5000/oauthcallback'
        );
        var youtube = google.youtube({
            version: 'v3',
            auth: oauth2Client
        });
        youtube.playlistItems.insert({
            part: 'id,snippet',
            resource: {
                snippet: {
                    playlistId: "YOUR_PLAYLIST_ID",
                    resourceId: {
                        videoId: "THE_VIDEO_ID_THAT_YOU_WANT_TO_ADD",
                        kind: "youtube#video"
                    }
                }
            }
        }, function (err, data, response) {
            if (err) {
                lien.end('Error: ' + err);
            }
            else if (data) {
                lien.end(data);
            }
            if (response) {
                console.log('Status code: ' + response.statusCode);
            }
        });
    },
    getListPlaylistFromChanel: async (req, res) => {
        var body = res.body;
        var strURL = 'https://youtube.googleapis.com/youtube/v3/playlists?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI'
        var strPart = '&part=snippet&maxResults=20'
        var strIDPlaylist = '&channelId=UCpd1Gf-SZjc_5ce5vVq5FTg'
        await axios.get(strURL + strPart + strIDPlaylist).then(data => {
            if (data) {
                var array = [];
                data.data.items.forEach(item => {
                    array.push({
                        name: item.snippet.title,
                    })
                })
                // console.log(data);
                var result = {
                    array: array,
                    all: data.data.items.length
                }
                res.json(result);
            }
            else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })
    },
    getVideoFromPlaylist: async (req, res) => {
        var body = req.body;
        var strURL = 'https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI'
        var strPart = '&part=snippet&maxResults=20'
        var strIDPlaylist = '&playlistId=PLzXDRSq8o2GNnjHqr3z6P1LRFGw3RY0fB'
        await axios.get(strURL + strPart + strIDPlaylist).then(data => {
            if (data) {
                var array = [];
                data.data.items.forEach(item => {
                    array.push({
                        name: item.snippet,
                    })
                })
                // console.log(data);
                var result = {
                    array: array,
                    all: data.data.items.length
                }
                res.json(result);
            }
            else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })
    },
    // &order=viewCount
    // "nextPageToken": "CAIQAA", thay đổi vào pageToken=CAIQAA sẽ next trang
    // "prevPageToken": "CAEQAQ",
    // list=PLzXDRSq8o2GNnjHqr3z6P1LRFGw3RY0fB
    // channelId=UCpd1Gf-SZjc_5ce5vVq5FTg tìm kiếm theo chanel
    // q=Preyta& tìm kiếm theo key
    //  https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI&channelId=UCpd1Gf-SZjc_5ce5vVq5FTg&part=snippet,id&order=date&maxResults=10&q=Preyta&list=PLzXDRSq8o2GNnjHqr3z6P1LRFGw3RY0fB&type=video&pageToken=CAIQAA
    getVideoFromChanel: async (req, res) => {
        let body = req.body;
        await database.connectDatabase().then(async db => {
            if (db) {
                var stringURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI'
                var stringIDChanel = '&channelId=' + body.chanelID
                var strPart = '&part=snippet,id&order=date'
                var maxResults = '&maxResults=10&type=video'
                var pageToken = '&pageToken=' + (body.pageToken ? body.pageToken : 'CAoQAA')
                console.log(pageToken);
                let now = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                await axios.get(stringURL + stringIDChanel + strPart + maxResults + pageToken).then(async data => {
                    if (data) {
                        console.log(data.data);
                        var array = [];
                        let prevPageToken = data.data.prevPageToken ? data.data.prevPageToken : '';
                        let nextPageToken = data.data.nextPageToken ? data.data.nextPageToken : '';
                        for (var detailVideo = 0; detailVideo < data.data.items.length; detailVideo++) {
                            var objDetailVideo = {};
                            let objWhere = {}
                            if (data.data.items[detailVideo].id.videoId) {
                                objWhere = {
                                    VideoID: data.data.items[detailVideo].id.videoId
                                }
                            } else {
                                objWhere = {
                                    PlayListID: data.data.items[detailVideo].id.playlistId
                                }
                            }
                            let chekVideoIDExist = await mtblVideoManager(db).findOne({
                                where: objWhere
                            })
                            if (!chekVideoIDExist) {
                                await mtblVideoManager(db).create({
                                    Name: data.data.items[detailVideo].kind,
                                    ViewVideo: 0,
                                    Likes: 0,
                                    CreateDate: data.data.items[detailVideo].publishTime ? data.data.items[detailVideo].publishTime : null,
                                    EditDate: now,
                                    Type: data.data.items[detailVideo].id.videoId ? 'Video' : 'Playlist',
                                    Status: data.data.items[detailVideo].liveBroadcastContent,
                                    Duration: 0,
                                    IDChanel: data.data.items[detailVideo].snippet.channelId,
                                    VideoID: data.data.items[detailVideo].id.videoId,
                                    PlayListID: data.data.items[detailVideo].id.playlistId,
                                    Title: data.data.items[detailVideo].snippet.title,
                                    Description: data.data.items[detailVideo].snippet.description,
                                    LinkImage: data.data.items[detailVideo].snippet.thumbnails.default.url,
                                })
                                objDetailVideo = {
                                    name: data.data.items[detailVideo].kind,
                                    viewVideo: 0,
                                    likes: 0,
                                    createDate: data.data.items[detailVideo].publishTime ? data.data.items[detailVideo].publishTime : null,
                                    editDate: now,
                                    type: data.data.items[detailVideo].id.videoId ? 'Video' : 'Playlist',
                                    status: data.data.items[detailVideo].liveBroadcastContent,
                                    duration: 0,
                                    chanelID: data.data.items[detailVideo].snippet.channelId,
                                    videoID: data.data.items[detailVideo].id.videoId,
                                    playListID: data.data.items[detailVideo].id.playlistId,
                                    title: data.data.items[detailVideo].snippet.title,
                                    description: data.data.items[detailVideo].snippet.description,
                                    linkImage: data.data.items[detailVideo].snippet.thumbnails.default.url,
                                }
                            } else {
                                objDetailVideo = await getDetailTBLVideoManager(data.data.items[detailVideo].id.videoId, data.data.items[detailVideo].id.playlistId)
                            }
                            array.push(objDetailVideo)
                        }
                        var result = {
                            nextPageToken: nextPageToken,
                            prevPageToken: prevPageToken,
                            array: array,
                            status: Constant.STATUS.SUCCESS,
                            message: Constant.MESSAGE.ACTION_SUCCESS,
                            all: data.data.items.length,
                        }
                        res.json(result);
                    }
                    else {
                        res.json(Result.SYS_ERROR_RESULT)
                    }
                })
            } else {
                res.json(Constant.MESSAGE.USER_FAIL)
            }
        })
    },
    getDetailVideo: async (req, res) => {
        var body = req.body;
        let results = await getDetailVideo(body.videoID)
        if (results) {
            var result = {
                result: results,
                status: Constant.STATUS.SUCCESS,
                message: ''
            }
            res.json(result);
        } else {
            var result = {
                status: Constant.STATUS.FAIL,
                message: 'Video không tồn tại !'
            }
            res.json(result);
        }
    }
}