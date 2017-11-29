var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    footprintList: [],
    userid:''
  },
  getFootprintList() {
    let that = this;
    util.request(api.FootprintList,{userid:that.data.userid}).then(function (res) {
      // console.log(res);
      // console.log('这是我的足迹+++++++++++++++++++++++++++++++');
      if (res.errno === 0) {
        // console.log(res.data);
        that.setData({
          footprintList: res.data.data
        });
      }
    });
  },
  deleteItem (event){
    let that = this;
    let footprint = event.currentTarget.dataset.footprint;
    var touchTime = that.data.touch_end - that.data.touch_start;
    let coursesId = event.currentTarget.dataset.courseid;
    console.log(touchTime);
    console.log('这是长按时间++++++++++++++++++++++++++++++++++++')
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '',
        content: '要删除所选足迹？',
        success: function (res) {
          if (res.confirm) {
            util.request(api.FootprintDelete, { footprintid: footprint.id,userid:that.data.userid}).then(function (res) {
              // console.log(res);
              // console.log('删除足迹++++++++++++++++++++++++++++++++++++');
              if (res.errno === 0) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                that.getFootprintList();
              }
            });
          
          }
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/course/course?courseid=' + coursesId + 'userid=' + that.data.userid,
      });
    }
    
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id||'',
    })
    if (this.data.userid){
      this.getFootprintList();
    }else{
      wx.showToast({ title: '请先登录' });
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
  //按下事件开始  
  touchStart: function (e) {
    console.log(e);
    console.log('开始时间+++++++++++++++++++')
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },
  //按下事件结束  
  touchEnd: function (e) {
    console.log(e);
    console.log('结束时间+++++++++++++++++++')
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  }, 
})