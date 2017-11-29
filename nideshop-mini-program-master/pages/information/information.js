var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
 
Page({
  data: {
    infoList: [],
    userid:0
  },
  getAskList() {
    let that = this;
    util.request(api.InfomationList).then(function (res) {
      console.log(res)
      console.log('咨询列表======================')
      if (res.errno === 0) {
        console.log(res);
        console.log('咨询列表++++++++++++++++++++++');
        that.setData({
          infoList: res.data.data
        });
      }
    });
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id||'',
    });
    this.getAskList();
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