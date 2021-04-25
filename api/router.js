module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');

    app.route('/get_list_video_from_chanel').post(youtube.getVideoFromChanel);
    app.route('/get_list_video_from_playlist').post(youtube.getVideoFromPlaylist);
    app.route('/get_list_playlist_from_chanel').post(youtube.getListPlaylistFromChanel);

}