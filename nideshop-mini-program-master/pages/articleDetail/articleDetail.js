var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var WxParse = require('../../lib/wxParse/wxParse.js');
var app = getApp();
  // WxParse.wxParse('goodsDetail', 'html', res.data.info.course_desc, that);
Page({
  
  data: {
    articleId: 0,
    articleDetail:'',
    userid:0,
    commenList: [],
    commentCount: 0,
    page: 1,
    size: 5,
    comment: '',
    inputvalue: '',
    // article:'<div style="text-align:center;">《静夜思》· 李白<br />床前明月光，<br />疑是地上霜。 <br />举头望明月， <br />低头思故乡。<br /></div>'

   
  },
  getArticleDetail() {
    let that = this;
    util.request(api.ArticleDetail, { articleid: that.data.articleId}).then(function (res) {
      if (res.errno === 0) {
        console.log(res);
        console.log('文章详情++++++++++++++++++++++');
        that.setData({
          articleDetail: res.data.articleInfo
        });
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);
    that.setData({
      article: temp
    })
    this.setData({
      userid: app.globalData.userInfo.id||'',
      articleId:options.articleid
    });
    this.getArticleDetail();
    this.getCommentList();
  },


  //获取评论列表
  getCommentList: function () {
    let that = this;

    util.request(api.CommentList, { typeid: '0', valueid: that.data.articleId, page: that.data.page, size: that.data.size }).then(function (res) {
      console.log(res);
      console.log('这是评论列表============================');
      if (res.errno === 0) {
        that.setData({
          commenList: res.data.data,
          commentCount: res.data.count
        });
      }
    });
  },
  //获取评论内容
  comment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //发表评论
  pubComment: function () {
    let that = this;
    console.log(that.data.comment);
    if(that.data.userid){
      util.request(api.PubComment, { userid: that.data.userid, typeid: '0', valueid: that.data.articleId, content: that.data.comment }, 'POST').then(function (res) {
        console.log(res);
        console.log('这是发表评论============================');
        if (res.errno === 0) {
          that.setData({
            inputvalue: ''
          });
          that.getCommentList();
        }
      });
    }else{
      wx.showToast({ title: '请先登录' });
    }
    
  },
  //分享转发功能
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.data.articleDetail.title,
      desc: '海数据在线',
      path: '/pages/articleDetail/articleDetail?articleid=' + that.data.articleId,
      success: function (res) {
        console.log(res);
        console.log("分享成功");
      },

    }
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  
 
 
})