var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();
 
Page({
  data: {
    typeId: 0,
    CourseCollectList: [],
    userid:'',
    infoCollectList:[]
  },
  getCollectList() {
    let that = this;
    util.request(api.CollectCourseList, { typeid: that.data.typeId,userid:that.data.userid}).then(function (res) {
      if (res.errno === 0) {
        console.log(res);
        console.log('我的课程收藏列表++++++++++++++++++++++');
        that.setData({
          CourseCollectList: res.data.data
        });
      }
    });
  },
  getInfoCollectList() {
    let that = this;
    util.request(api.CollectCourseList, { typeid: 1, userid: that.data.userid }).then(function (res) {
      if (res.errno === 0) {
        console.log(res);
        console.log('我的咨询收藏列表++++++++++++++++++++++');
        that.setData({
          infoCollectList: res.data.data
        });
      }
    });
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id||'',
    });
    if(this.data.userid){
      this.getCollectList();
      this.getInfoCollectList();
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
  openCourse(event) {
    console.log(event);
    console.log('这是event++++++++++++++++++++++++++++++++++++++++')
    let that = this;
    if (event.currentTarget.dataset.type=='course'){
      var id = this.data.CourseCollectList[event.currentTarget.dataset.index].value_id;
      var typeid=0;
    } else if (event.currentTarget.dataset.type == 'info'){
      var id = this.data.infoCollectList[event.currentTarget.dataset.index].value_id;
      var typeid = 1;
    }
    
   
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    console.log(touchTime);
    //如果按下时间大于350为长按  
    if (touchTime > 350) {
      wx.showModal({
        title: '',
        content: '确定删除吗？',
        success: function (res) {
          if (res.confirm) {
            
            util.request(api.CollectCourse, { typeid: typeid, valueid:id,userid:that.data.userid}).then(function (res) {
              if (res.errno === 0) {
                // console.log(res.data);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                that.getCollectList();
                that.getInfoCollectList();
              }
            });
          }
        }
      })
    } else {
      if (event.currentTarget.dataset.type == 'course'){
        wx.navigateTo({
          url: '/pages/course/course?courseid=' + id + 'userid=' + that.data.userid,
        });
      }else{
        wx.navigateTo({
          url: '/pages/infoDetail/infoDetail?infoid=' + id ,
        });
      }
      
    }  
  },
  //按下事件开始  
  touchStart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-start')
  },
  //按下事件结束  
  touchEnd: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
    console.log(e.timeStamp + '- touch-end')
  }, 
})