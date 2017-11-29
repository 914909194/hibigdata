var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

 

var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '活动相关', '课程相关', '客户服务', '优惠活动', '教师相关', '课程建议', '其他'],
    index: 0,
    userid:'',
    content:'',
    tel:'',
    telvalue:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value
    })
  }, 
  tel:function (e) {
      this.setData({
        tel: e.detail.value
      })
    }, 
  //提交反馈
  formSubmit:function(){
    if(this.data.userid){
      console.log(this.data.content);
      console.log(this.data.tel);
      let that = this;
      util.request(api.FeedBack, { userid: that.data.userid, feedbackType: that.data.index, tel: that.data.tel, feedbackContent: that.data.content}, 'POST').then(function (res) {
          console.log(res);
          console.log('这是反馈意见666666666666666666666666666666666');
          if (res.errno === 0) {
            that.setData({  
              content:'',
              telvalue:''
            });
          }
        });
    
    }else{
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id || '',
    });

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
  }
})