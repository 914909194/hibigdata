var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Page({
  data: {
   userid:'',
   userinfo: ''
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id || '',
    });
    console.log(this.data.userid)
    if (this.data.userid) {
      this.getUserInfo();
    } else {
      wx.showToast({ title: '请先登录' });
    }
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示

  },
  getUserInfo (){
    let that = this;
    util.request(api.GetUserInfo, { userid: that.data.userid }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          userinfo: res.data.userInfo
        });
      }
      console.log(that.data.userinfo);
      console.log("用户信息+++++++++++++++++++++++++++++");
    });
  },
 

  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})