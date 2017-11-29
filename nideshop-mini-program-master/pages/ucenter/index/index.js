var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    userid: app.globalData.userInfo.id || '',
    useronline:''
    
  },
  onLoad: function (options) {
    
    user.checkLogin().then(res => {
      this.setData({
        useronline: res
      });
      console.log(res);
      console.log("登录状态判断++++++++++++++++++++++++++++++++++++")
    }).catch((err) => {
      console.log(err)
      console.log("登录状态判断失败+++++++++++++++++++++++++++++++++++")
    });
    // 页面初始化 options为页面跳转所带来的参数
    console.log(this.data.userid);
    console.log('初始化个人信息+++++++++++++++++++');
  },
  onReady: function () {

  },
  onShow: function () {

    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
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
  }, 
  goLogin(){
    user.loginByWeixin().then(res => {
      this.setData({
        userInfo: res.data.userInfo,
        useronline: true
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
    console.log(this.data.userinfo);
    console.log('登录信息+++++++++++++++++++++++++++++++++');
  },
  exitLogin: function () {
    let that=this;
    wx.showModal({
      title: '', 
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          app.globalData.userInfo.id='';
          app.globalData.userInfo.avatar = 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png';
          app.globalData.userInfo.nickname = 'Hi,游客';
          that.setData({
            useronline: false
          });
          wx.switchTab({
            url: '/pages/index/index'
          });  
        }
      }
    })

  }
})