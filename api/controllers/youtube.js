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

const passport = require('passport')
async function getURLAvatarChanel(chanelID) {
    let result = ''
    var strUrl = 'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI&id='
    await axios.get(strUrl + chanelID).then(data => {
        if (data) {
            result = data.data.items[0].snippet.thumbnails.default.url
        }
    })
    return result
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
module.exports = {
    getDetailVideo,
    getURLAvatarChanel,
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
        var body = req.body;
        var stringURL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI'
        var stringIDChanel = '&channelId=' + body.chanelID
        var strPart = '&part=snippet,id&order=date'
        var maxResults = '&maxResults=10&type=video'
        var pageToken = '&pageToken=CAIQAA'
        await axios.get(stringURL + stringIDChanel + strPart + maxResults + pageToken).then(data => {
            if (data) {
                var array = [];
                data.data.items.forEach(item => {
                    array.push({
                        name: item,
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