var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
 
Page({
  data: {
    ArticleList:[],
    AuthorList:[],
    userid:''
  },  
  //获取专栏文章列表
  getArticleList() {
    let that = this;
    util.request(api.ArticleList).then(function (res) {
      if (res.errno === 0) {
        
        that.setData({
          ArticleList: res.data.data
        });
        console.log(that.data.ArticleList);
        console.log('专栏页文章列表+++++++++++++++++++++++++');
      }
    });
  },
  //获取文章列表
  getAuthorList() {
    let that = this;
    util.request(api.AuthorList).then(function (res) {
      console.log(res);
      console.log('作者列表+++++++++++++++++++++++++');
      if (res.errno === 0) {

        that.setData({
          AuthorList: res.data
        });
      }
    });
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id,
    });
    this.getArticleList();
    this.getAuthorList();
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