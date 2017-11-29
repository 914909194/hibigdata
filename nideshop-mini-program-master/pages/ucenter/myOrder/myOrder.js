var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data:{
    orderList:[],
    courseOrderList:[],
    activityFlag:false,
    courseFlag:false,
    userid:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ 
      userid: app.globalData.userInfo.id || '',
    });
    if(this.data.userid){
      this.getOrderList();
      this.getCourseOrder();
    }else{
      wx.showToast({ title: '请先登录' });
    }
    
  }, 
  //获取我的活动订单
  getOrderList(){
    let that = this;
    var userid = app.globalData.userInfo.id;
    console.log(userid);
    util.request(api.ActivityOrderList,{userid:userid}).then(function (res) {

      if (res.errno === 0) {
        that.setData({
          orderList: res.data.data
        });
      }
    });
  }, 
  //获取我的课程订单
  getCourseOrder() {
    let that = this;
    var userid = app.globalData.userInfo.id;
    console.log(userid);
    util.request(api.MyCourseOrder, { userid: userid }).then(function (res) {
      console.log(res);
      if (res.errno === 0) {
        console.log(res);
        console.log('我的课程订单+++++++++++++++++++++++++++++++');
        console.log(res.data.data);
        that.setData({
          courseOrderList: res.data.data
        });
      }
      console.log(that.data.courseOrderList);
    });
  },
  //取消活动订单
  cancellOrder(event){
    let that = this;
    var userid = app.globalData.userInfo.id;
    var activityapplyid = event.currentTarget.dataset.cancellorder
    util.request(api.CancellOrder, { userid: userid, activityapplyid: activityapplyid}).then(function (res) {
      if (res.errno === 0) {
        // console.log(res.data.data);
        that.setData({
          orderList: res.data.data
        });
      }
    });
  },
  //取消课程订单
  cancellCourseOrder: function (event){
    // console.log('++++++++++++++++');
    let that = this;
    var userid = app.globalData.userInfo.id;
    var courseApplyId = event.currentTarget.dataset.cancellorder;
    util.request(api.CancelCourseOrder, { userid: userid, courseApplyId: courseApplyId }).then(function (res) {
      if (res.errno === 0) {
        console.log(res.data.data);
        that.setData({
          courseOrderList: res.data.data
        });
        console.log('取消课程订单');
      }
    });
  },
  //跳转活动付款页面
  payOrder(event){
    var activityId = event.currentTarget.dataset.id;
    // console.log(activityId);
    wx.redirectTo({
      url: '../../activityDetail/activityDetail?activityid=' + activityId,
    })
  },
//跳转课程付款页面
  payCourseOrder:function(event){
    var courseId = event.currentTarget.dataset.id;
    var userid = app.globalData.userInfo.id;
    // console.log(activityId);
    wx.redirectTo({
      url: "../../course/course?courseid=" + courseId+"&userid="+userid,
    })
  },
  //课程订单列表显示隐藏
  couOrderTap:function(){
    this.setData({
      courseFlag:!this.data.courseFlag,
      activityFlag:false
    });
  },
  // 活动订单列表显示隐藏
  actOrderTap:function(){   
    this.setData({
      courseFlag: false,
      activityFlag: !this.data.activityFlag
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})