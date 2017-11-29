var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
 
Page({
  data: {
    articleCount:0,
    userid:0,
    authorid:'',
    AuthorArticleList:[],
    ArticleNum:0,
    AuthorDetail:''
  },
  //获取文章详情
  getAuthorDetail() {
    let that = this;
    util.request(api.AuthorDetail, { authorid: that.data.authorid}).then(function (res) {
      if (res.errno === 0) {
        console.log(res);
        console.log('作者详情++++++++++++++++++++++');
        that.setData({
          AuthorDetail: res.data
        });
      }
    }); 
  },
  //获取该作者文章列表
  getAuthorArticleList() {
    let that = this;
    util.request(api.AuthorArticleList, { authorid: that.data.authorid }).then(function (res) {
      if (res.errno === 0) {

        that.setData({
          AuthorArticleList: res.data.data,
          articleCount:res.data.count
        });
        console.log(res);
        console.log('作者文章列表+++++++++++++++++++++++++');
      }
    });
  },
  //获取该作者文章数量
  getAuthorArticleCount() {
    let that = this;
    util.request(api.AuthorArticleCount, { authorid: that.data.authorid }).then(function (res) {
      console.log(res);
      console.log('作者文章数量+++++++++++++++++++++++++');
      if (res.errno === 0) {

        that.setData({
          ArticleNum: res.data.authorarticlecount
        });
      }
    });
  },
  //作者流量加一
  authorHits:function(){
    let that = this;
    util.request(api.AuthorHits, { authorid: that.data.authorid}).then(function (res) {
      console.log(res);
      console.log('作者访问流量+++++++++++++++++++++++++');
      // if (res.errno === 0) {

      //   that.setData({
      //     ArticleNum: res.data.authorarticlecount
      //   });
      // }
    });
  },
  onLoad: function (options) {
    console.log(options);
    console.log('页面带过来的参数+++++++++++++++++++');
    this.setData({
      userid: app.globalData.userInfo.id,
      authorid:options.authorid,
    });
    this.authorHits();
    this.getAuthorDetail(); 
    this.getAuthorArticleList();
    this.getAuthorArticleCount()
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