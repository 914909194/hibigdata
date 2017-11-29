var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
  
Page({
  data: {
    ArticleList:[],
    userid:'',
    _num:'',
    currentSortOrder: '',
    searchStatus:'',
    isHot:'',
    isNew:'',
    defaultSize:5
  },
  getMoreArticle() {
    let that = this;
    util.request(api.ArticleIndex).then(function (res) {
      if (res.errno === 0) {

        that.setData({
          ArticleList: res.data
        });
        // console.log(that.data.ArticleList);
        // console.log('文章列表+++++++++++++++++++++++++');
      }
    });
  },
  getArticleList() {
    let that = this;
    util.request(api.ArticleList,{isHot:that.data.isHot,isNew:that.data.isNew,page:that.data.page,size:that.data.size}).then(function (res) {
      console.log(res);
      console.log('文章列表+++++++++++++++++++++++++');
      if (res.errno === 0) {
        that.setData({
          ArticleList: res.data.data
        });
       
      }
    });
  },
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var that = this;
    if (e.target.dataset.course == 'new') {
      console.log('最新文章+++++++++++++++++++++++');
      that.setData({
        isNew: '0',
        isHot: '',
        size: that.data.defaultSize,
        sort: 'freeprice',
        order: '',
        searchStatus: 'new',
        noMore: false
      });
      this.getArticleList();
    } else if (e.target.dataset.course == 'hot') {
      console.log('热门文章+++++++++++++++++++++++');
      that.setData({
        isNew: '0',
        isHot: '',
        size: that.data.defaultSize,
        sort: 'freeprice',
        order: '',
        searchStatus: 'hot',
        noMore: false,
        keyWords:'',
        page:1,
        size:5
      });
      this.getArticleList();
     
    } else if (e.target.dataset.course == 'hits') {
      console.log('点击量+++++++++++++++++++++++');
     
      let tmpSortOrder = 'asc';
      if (that.data.currentSortOrder == 'asc') {
        tmpSortOrder = 'desc';
      }
      console.log(tmpSortOrder+'-================');
      that.setData({
        'currentSortOrder': tmpSortOrder,
        searchStatus: 'hits',
        noMore: false
      });
      util.request(api.ArticleList, { page: that.data.page, size: that.data.defaultSize, sort: 'view_count', order: that.data.currentSortOrder })
        .then(function (res) {
          that.setData({
            ArticleList: res.data.data,
          });
        });
    }
  },
  //获取搜索关键词
  serchKeyWords: function (e) {
    this.setData({
      keyWords: e.detail.value
    })
  },
  //文章搜索
  search: function () {
    var keyword = this.data.keyWords;
    var userid = app.globalData.userInfo.id;
    var that = this;
    this.setData({
      page: 1,
      searchStadus: 'search'
    });

    util.request(api.ArticleList, { userid: userid, keyword: keyword, page: that.data.page, size: that.data.size }).then(function (res) {
      
      if (res.errno === 0) {
        that.setData({
          ArticleList: res.data.data,
          
        });
        // console.log(that.data.);
        // console.log('文章搜索结果================================');
      }
    });

  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id,
    });
    this.getMoreArticle();
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