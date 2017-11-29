var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();

Page({
  data:{
    orderId: 0,
    orderInfo: {},
    orderGoods: [],
    handleOption: {},
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    this.setData({
      activityapplyid: options.activityapplyid,
      userid:options.userid
    });
    this.getOrderDetail();
  },
  getOrderDetail() {
    let that = this;
    var userid = app.globalData.userInfo.id;
    console.log(userid);
    console.log(that.data.activityapplyid);
    util.request(api.OrderDetail, { activityapplyid: that.data.activityapplyid,userid: userid}).then(function (res) {
      //console.log(res);
      if (res.errno === 0) {
        that.setData({
          orderInfo: res.data.activityApplyInfo,
          orderGoods: res.data.orderGoods,
          handleOption: res.data.handleOption
        });
        //that.payTimer();
      }
    });
  },
  payTimer (){
    let that = this;
    let orderInfo = that.data.orderInfo;
    
    setInterval(() => {
      console.log(orderInfo);
      orderInfo.add_time -= 1;
      that.setData({
        orderInfo: orderInfo,
      });
    }, 1000);
  },
  /*payOrder() {
    wx.redirectTo({
      url: '/pages/pay/pay',
    })
  },*/
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
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
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})