var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../services/user.js');
const app = getApp();
Page({ 
  data: {
    activeList: [],
    page: 1,
    size: 5,
    totalPages: 1,
    userInfo: {},
    keywords:"",
    active:{priceOrder:0},
    scrollTop: 0,
    scrollHeight: 0,
    hidden: false,
    noMore:false,
    searchStadus:'',
    activityCount:0,
    userid:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    // var userid = app.globalData.userInfo.id;
    that.setData({
      userid: app.globalData.userInfo.id
    });
    util.request(api.ActivityCount).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activityCount: res.data.activityCount
        });
      }
      wx.hideLoading();
    });
    this.getActiveList();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  getActiveList: function () {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this; 
    var userid = app.globalData.userInfo.id;
    util.request(api.ActivityList,{userid:that.data.userid,page:that.data.page,size:that.data.size}).then(function (res) {
      console.log(res);
      console.log('活动列表+++++++++++++++++++++++++++++++++++++');
      if (res.errno === 0) {
        that.setData({
         activeList: that.data.activeList.concat(res.data.activityData.data)
        
        });
      }
      wx.hideLoading();
    });
  },
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var that = this;
    if (e.target.dataset.course == 'new') {
      console.log('new');
      //新品活动筛选
      that.newActivity();
    } else if (e.target.dataset.course == 'hot') {
      console.log('hot');
      //执行热门活动筛选
      that.hotActivity();
    } else if (e.target.dataset.course == 'price') {
      let tmpSortOrder = 'asc';
      if (this.data.currentSortOrder == 'asc') {
        tmpSortOrder = 'desc';
      }
      this.setData({
        'currentSortOrder': tmpSortOrder,
        searchStatus: 'price',
        noMore: false
      });
      console.log('price');
      console.log(that.data.currentSortOrder);
      if (that.data.currentSortOrder=='asc'){
        that.priceOrderAsc();
      }else{
        that.priceOrderDesc();
      }
    }
  },
  //下拉加载处理函数
  bindDownLoad: function () {
    var that = this;
    var userid = app.globalData.userInfo.id;
    this.setData({
      // page: that.data.page+1,
      size: that.data.size + 5,
      hidden:true
    });
    if (this.data.searchStadus==''){
      util.request(api.ActivityList, { userid: userid, size: that.data.size }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            hidden: false,
            activeList: that.data.activeList=res.data.activityData.data
          });
        }
        if (res.data.activityData.data.length === res.data.activityData.count) {
          that.setData({
            noMore: true,
            hidden: false
          });
        }
        wx.hideLoading();
      });
    }else if(this.data.searchStadus == 'newActivity'){
      util.request(api.ActivityList, { userid: userid, size: that.data.size, isNew: '0'}).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            hidden: false,
            activeList: that.data.activeList=res.data.activityData.data
          });
        }
        if (res.data.activityData.data.length === res.data.activityData.count) {
          that.setData({
            noMore: true,
            hidden: false
          });
        }
        wx.hideLoading();
      });
    } else if (this.data.searchStadus == 'hotActicity'){
      util.request(api.ActivityList, { userid: userid, size: that.data.size, isHot: '0' }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            hidden: false,
            activeList: that.data.activeList=res.data.activityData.data
          });
        }
        if (res.data.activityData.data.length === res.data.activityData.count) {
          that.setData({
            noMore: true,
            hidden: false
          });
        }
        wx.hideLoading();
      });
    } else if (this.data.searchStadus == 'priceDesc'){
      util.request(api.ActivityList, { userid: userid, size: that.data.size, sort: 'price', order: 'desc' }).then(function (res) {
        if (res.errno === 0) {
          that.setData({
            hidden: false,
            activeList: that.data.activeList = res.data.activityData.data
          });
        }
        if (res.data.activityData.data.length === res.data.activityData.count) {
          that.setData({
            noMore: true,
            hidden: false
          });
        }
        wx.hideLoading();
      });

    } else if (this.data.searchStadus == 'priceAsc'){
        util.request(api.ActivityList, { userid: userid, size: that.data.size, sort: 'price', order: 'asc' }).then(function (res) {
          if (res.errno === 0) {
            that.setData({
              hidden: false,
              activeList: that.data.activeList = res.data.activityData.data
            });
          }
          if (res.data.activityData.data.length === res.data.activityData.count) {
            that.setData({
              noMore: true,
              hidden: false
            });
          }
          wx.hideLoading();
        });
    }
   


  },

  onReachBottom() {
    if (this.data.totalPages > this.data.page) {
      this.setData({
        page: this.data.page + 1
      });
    } else {
      return false;
    }

    this.getActiveList();
  },
  // 活动搜索功能
  search:function(){
    
    var keyword = this.data.keyWords;
    var userid = app.globalData.userInfo.id;
    var that=this;
    this.setData({
      page: 1,
      searchStadus:'search'
    });

    util.request(api.ActivityList, { userid: userid, keyword: keyword, page: that.data.page, size:      that.data.size}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activeList: that.data.activeList=res.data.activityData.data
        });
      }
      wx.hideLoading();
    });

  },
  //绑定搜索框里的搜索关键字
  serchKeyWords: function (e) {
    this.setData({
      keyWords: e.detail.value
    })
  },

  //新品活动筛选功能
  newActivity:function(){
    var userid = app.globalData.userInfo.id;
    var that=this;
    this.setData({
      size: 5,
      searchStadus: 'newActivity'
    });
    util.request(api.ActivityList, { userid: userid, isNew: '0',  size: that.data.size}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activeList: that.data.activeList = res.data.activityData.data
        });
      }
      wx.hideLoading();
    });
  },

  //热门活动筛选
  hotActivity:function(){
    var userid = app.globalData.userInfo.id;
    var that = this;
    this.setData({
      size:5,
      searchStadus: 'hotActicity'
    });
    util.request(api.ActivityList, { userid: userid, isHot: '0', size: that.data.size}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activeList: that.data.activeList = res.data.activityData.data
        });
      }
      wx.hideLoading();
    });
  },
  //价格升排序
  priceOrderAsc:function(){
    var userid = app.globalData.userInfo.id;
    var that = this;
    that.setData({
      active: that.data.active={priceOrder:1},
      size:5,
      searchStadus: 'priceAsc'
    });
    util.request(api.ActivityList, { userid: userid, sort: 'price', order: 'asc',  size: that.data.size }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activeList: that.data.activeList = res.data.activityData.data
        });
      }
      wx.hideLoading();
    });
  },
  //价格降排序
  priceOrderDesc: function () {
    var userid = app.globalData.userInfo.id;
    var that = this;
    that.setData({
      active: that.data.active = { priceOrder: 0 },
      size:5,
      searchStadus: 'priceDesc'
    });
    util.request(api.ActivityList, { userid: userid, sort: 'price', order: 'desc',  size: that.data.size}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          activeList: that.data.activeList = res.data.activityData.data
        });
      }
      wx.hideLoading();
    });
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
