var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    joinActivity:{},
    userinfo:{},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    userInfo:{},
    userid:''
  },
  infoSubmit:function(e){
    var warn = "";//弹框时提示的内容
    var flag = true;//判断信息输入是否完整
    if(this.data.userid){
      if (e.detail.value.realname == "") {
        warn = "请填写您的姓名！";
      } else if (e.detail.value.mobile == "") {
        warn = "请填写您的手机号！";
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.mobile))) {
        warn = "手机号格式不正确";
      } else if (e.detail.value.email == "") {
        warn = "请填写您的邮箱"
      } else if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(e.detail.value.email))) {
        warn = "邮箱格式不正确";
      } else if (e.detail.value.wechat == "") {
        warn = "请填写您的微信号";
      } else if (e.detail.value.company == "") {
        warn = "请填写您的公司/机构";
      } else if (e.detail.value.position == "") {
        warn = "请填写您的职称";
      } else {
        flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        var that = this;
        var infos = e.detail.value;
        console.log(infos);
        console.log(that.data.joinActivity);
        console.log(app.globalData.userInfo.username);
        wx.request({
          method: 'POST',
          url: api.formSubmit, //接口地址
          data: {
            'username': app.globalData.userInfo.username,
            'userid': app.globalData.userInfo.id,
            'realname': infos.realname,
            'email': infos.email,
            'mobile': infos.mobile,
            'wechat': infos.wechat,
            'company': infos.company,
            'position': infos.position,
            'price': that.data.joinActivity.price,
            'activityid': that.data.joinActivity.id,
            'title': that.data.joinActivity.title,
            'listimg': that.data.joinActivity.list_img,
            'date': that.data.joinActivity.date,
            'address': that.data.joinActivity.address
          },

          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res);
            console.log("支付提交返回值+++++++++++++++++++++++++++++++++");
            var str = res.data.data.payInfo;
            var jsons = JSON.parse(str);

            // console.log(jsons);
            // console.log("succ");
            wx.requestPayment({
              timeStamp: jsons.timeStamp,
              nonceStr: jsons.nonceStr,
              package: jsons.package,
              signType: 'MD5',
              paySign: jsons.paySign,
              fail: function (aaa) {
                wx.showToast({ title: '支付失败' });
              },
              success: function () {
                wx.showToast({
                  title: '支付成功',
                  success: function () {
                    // wx.redirectTo({
                    //   url: '../activity/activity',
                    //   success:function(e){
                    //     console.log('跳转成功')
                    //     var page = getCurrentPages().pop();
                    //     if(page==undefined||page==null)
                    //     return;
                    //     page.onLoad();
                    //   }
                    // })
                    // wx.navigateBack({
                    //   delta:2
                    // })
                    wx.switchTab({
                      url: '../index/index'
                    })
                    // wx.navigateTo({
                    //   url: '../activity/activity',
                    //   success: function (e) {
                    //     console.log('跳转成功aaaaaaaaaaaa')
                    //     var page = getCurrentPages().pop();
                    //     if (page == undefined || page == null)
                    //       return;
                    //     page.onLoad();
                    //   }
                    // })
                  }
                });
              }
            })
          },
          fail: function (res) {
            console.log("fail");
          }
        })
      }
      /*如果信息填写不完整，弹出输入框*/
      if (flag == true) {
        wx.showModal({
          title: '提示',
          content: warn
        })
      }
    }else{
      wx.showToast({
        title: '请先登录'
      });
    }
    //判断各个输入框是否正确
   
     
  },
  getGoodsInfo: function () {
    let that = this;
    var username=app.globalData.userInfo.username;
    console.log(username);
    util.request(api.JoinDetail, { activityid: that.data.activityid , username: username}).then(function (res)    {
      if (res.errno === 0) {
        that.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          joinActivity: res.data.activityInfo,
          userInfo: res.data.userInfo,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        //WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

       // that.getGoodsRelated();
      }
    });

  },
  onLoad: function (options) {
    
    // 页面初始化 options为页面跳转所带来的参数 
    // console.log(options);
    this.setData({
      activityid: parseInt(options.activityid),
      username:options.username,
      userid: app.globalData.userInfo.id || '',
      
    });
    var that = this;
    this.getGoodsInfo();

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
  
})

