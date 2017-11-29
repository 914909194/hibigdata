var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
 
Page({
  data: {
    typeId: 0,
    CourseCollectList: [],
    userid:0,
    informationid:'',
    infoDetail:'',
    informationid:'',
    aboutInfoList:[],
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    userHasCollect: 0, 
  },
  //获取资讯详情
  getInfoDetail() {
    let that = this;
    util.request(api. InfomationDetail, { informationid: that.data.informationid,userid:that.data.userid}).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          infoDetail: res.data.information,
          informationid: res.data.information.id,
          userHasCollect: res.data.userHasCollect,
        });
        console.log(res);
        console.log('咨询详情++++++++++++++++++++++');
        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }
      }
    });
  },
  //获取相关资讯
  getAboutInfoList() {
    let that = this;
    util.request(api.InfomationRelated, { informationid: that.data.informationid }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          aboutInfoList: res.data
        });
        console.log(res);
        console.log('相关咨询列表+++====================+++++++++++++++++++');
      }
    });
  },
  //收藏功能
  closeAttrOrCollect: function () {
    let that = this;
    if (that.data.userid) {
      if (this.data.openAttr) {
        this.setData({
          openAttr: false,
        });
        if (that.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }
      } else {
        //添加或是取消收藏
        util.request(api.CollectCourse, { typeid: 1, valueid: that.data.informationid, userid: that.data.userid })
          .then(function (res) {
            console.log(res);
            console.log("收藏是否成功++++++++++++++++++++++++++++++++++++")
            let _res = res;
            if (_res.errno == 0) {
              if (_res.data.type == 'add') {
                that.setData({
                  'collectBackImage': that.data.hasCollectImage
                });
              } else {
                that.setData({
                  'collectBackImage': that.data.noCollectImage
                });
              }
            } else {
              wx.showToast({
                image: '/static/images/icon_error.png',
                title: _res.errmsg,
                mask: true
              });
            }

          });
      }
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userInfo.id||'',
      informationid:options.infoid
    });
    console.log(options);
    // that.data.informationid
    console.log(this.data.informationid)
    console.log('咨询id============================')
    this.getInfoDetail();
    this.getAboutInfoList();
  },
  //分享功能
  onShareAppMessage: function () {
    let that = this;
    return {
      title:  that.data.infoDetail.title,
      desc: '海数据在线',
      path: '/pages/infoDetail/infoDetail?infoid=' + that.data.informationid,
      // path: '/page/user?infoid=item.id'

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
  

})