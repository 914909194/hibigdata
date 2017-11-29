const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    hotActivity: [],
    hotCourse: [],
    information: [],
    technologyList: [],
    floorGoods: [],
    banner: [],
    channel: [],
    userId:'',
  },
  activityReport: function () {
    wx.navigateTo({
      url: '../activityReport/activityReport',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '海数据社区',
      desc: '海数据在线',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this; 
    console.log(that.data.userId);
    console.log("这是userid++++++++++++++++++++++++++++")
    util.request(api.IndexUrl,{userid:that.data.userId}).then(function (res) {
      console.log(res);
      console.log("首页数据++++++++++++++++++===============================")
      if (res.errno === 0) {
        that.setData({
          hotActivity: res.data.hotActivityList,
          hotCourse: res.data.hotCourseList,
          information: res.data.informationList,
          technologyList: res.data.technologyList,
          categoryList: res.data.categoryList,
          banner: res.data.banner,
          channel: res.data.channel
        });
        
      }
      // console.log(res.data.channel);
    });
  },
  openCourse:function(){
    wx.switchTab({
      url:"../category/category",
    })
  },
  onLoad: function (options) {
    this.setData({
      userId: app.globalData.userInfo.id || ''
    });

    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
