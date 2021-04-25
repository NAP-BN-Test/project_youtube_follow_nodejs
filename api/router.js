module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');

    app.route('/get_list_video_from_chanel').post(youtube.getVideoFromChanel);
    app.route('/get_list_video_from_playlist').post(youtube.getVideoFromPlaylist);
    app.route('/get_list_playlist_from_chanel').post(youtube.getListPlaylistFromChanel);

    var chanel = require('./controllers/ctl-tblChanelManager')
    app.route('/add_tbl_chanel_manager').post(chanel.addtblChanelManager);
    app.route('/update_tbl_chanel_manager').post(chanel.updatetblChanelManager);
    app.route('/delete_tbl_chanel_manager').post(chanel.deletetblChanelManager);
    app.route('/get_list_tbl_chanel_manager').post(chanel.getListtblChanelManager);

    var accountManager = require('./controllers/ctl-tblAccount')
    app.route('/add_tbl_account').post(accountManager.addtblAccount);
    app.route('/update_tbl_account').post(accountManager.updatetblAccount);
    app.route('/delete_tbl_account').post(accountManager.deletetblAccount);
    app.route('/get_list_tbl_account').post(accountManager.getListtblAccount);

    var videoManager = require('./controllers/ctl-tblVideoManager')
    app.route('/add_tbl_video_manager').post(videoManager.addtblVideoManager);
    app.route('/update_tbl_video_manager').post(videoManager.updatetblVideoManager);
    app.route('/delete_tbl_video_manager').post(videoManager.deletetblVideoManager);
    app.route('/get_list_tbl_video_manager').post(videoManager.getListtblVideoManager);

    var pointManager = require('./controllers/ctl-tblPointManager')
    app.route('/add_tbl_point_manager').post(pointManager.addtblPointManager);
    app.route('/update_tbl_point_manager').post(pointManager.updatetblPointManager);
    app.route('/delete_tbl_point_manager').post(pointManager.deletetblPointManager);
    app.route('/get_list_tbl_point_manager').post(pointManager.getListtblPointManager);

    var user = require('./controllers/ctl-tblUser')
    app.route('/add_tbl_user').post(user.addtblUser);
    app.route('/update_tbl_user').post(user.updatetblUser);
    app.route('/delete_tbl_user').post(user.deletetblUser);
    app.route('/get_list_tbl_user').post(user.getListtblUser);

}