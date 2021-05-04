module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');

    app.route('/get_list_video_from_channel').post(youtube.getVideoFromchannel);
    app.route('/get_list_video_from_playlist').post(youtube.getVideoFromPlaylist);
    app.route('/get_list_playlist_from_channel').post(youtube.getListPlaylistFromchannel);
    app.route('/get_detail_video').post(youtube.getDetailVideoManager);

    var channel = require('./controllers/ctl-tblchannelManager')
    app.route('/add_tbl_channel_manager').post(channel.addtblchannelManager);
    app.route('/update_tbl_channel_manager').post(channel.updatetblchannelManager);
    app.route('/delete_tbl_channel_manager').post(channel.deletetblchannelManager);
    app.route('/get_list_tbl_channel_manager').post(channel.getListtblchannelManager);

    var accountManager = require('./controllers/ctl-tblAccount')
    app.route('/add_tbl_account').post(accountManager.addtblAccount);
    app.route('/update_tbl_account').post(accountManager.updatetblAccount);
    app.route('/delete_tbl_account').post(accountManager.deletetblAccount);
    app.route('/get_list_tbl_account').post(accountManager.getListtblAccount);
    app.route('/plus_score_for_staff').post(accountManager.plusScoreForStaff);

    var videoManager = require('./controllers/ctl-tblVideoManager')
    app.route('/add_tbl_video_manager').post(videoManager.addtblVideoManager);
    app.route('/update_tbl_video_manager').post(videoManager.updatetblVideoManager);
    app.route('/delete_tbl_video_manager').post(videoManager.deletetblVideoManager);
    app.route('/get_list_tbl_video_manager').post(videoManager.getListtblVideoManager);

    app.route('/plus_likes').post(videoManager.plusLikes);

    app.route('/plus_views').post(videoManager.plusViews);

    var pointManager = require('./controllers/ctl-tblPointManager')
    app.route('/add_tbl_point_manager').post(pointManager.addtblPointManager);
    app.route('/update_tbl_point_manager').post(pointManager.updatetblPointManager);
    app.route('/delete_tbl_point_manager').post(pointManager.deletetblPointManager);
    app.route('/get_list_tbl_point_manager').post(pointManager.getListtblPointManager);

    var historyReviewVideo = require('./controllers/ctl-tblHistoryReviewVideo')
    app.route('/add_tbl_history_review_video').post(historyReviewVideo.addtblHistoryReviewVideo);
    app.route('/get_history_review_video_of_staff').post(historyReviewVideo.getHistoryReviewVideoOfStaff);


}