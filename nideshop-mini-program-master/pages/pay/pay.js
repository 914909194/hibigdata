var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    orderId: 0,
    actualPrice: 0.00
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: options.orderId,
      actualPrice: options.actualPrice
    })
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  //向服务请求支付参数
  // requestPayParam: function () {
  //   wx.request({
  //     url: 'https://hismartlab.cn:8080/pay/payPrepay',
  //     data: {
  //       orderId: orderId,
  //       payType: 1,
  //       money: actualPrice,
  //       payName: "海数据产品"
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       console.log('api result:');
  //       console.log(res.data);
  //       console.log(res.data.code);
  //       if (res.data.code == 1) {
  //         console.log('pay:');
  //         //6.获取到后台返回的参数数据包，解析并发起支付
  //         wx.requestPayment({
  //           timeStamp: res.data.timeStamp,
  //           nonceStr: res.data.nonceStr,
  //           package: res.data.package,
  //           signType: 'MD5',
  //           paySign: res.data.paySign,
  //           fail: function (aaa) {
  //             wx.showToast({ title: '支付失败' })
  //           },
  //           success: function () {
  //             wx.showToast({ title: '支付成功' })
  //           }
  //         })
  //       } else {
  //         wx.showToast({ title: '服务器忙' + res.data.code })
  //       }
  //     }
  //   })
  // },
  requestPayParam() {
    let that = this;
    util.request(api.PayPrepayId, { orderId: that.data.orderId, payType: 1 }).then(function (res) {
      if (res.errno === 0) {
        let payParam = res.data;
        wx.requestPayment({
          'timeStamp': payParam.timeStamp,
          'nonceStr': payParam.timeStamp,
          'package': payParam.nonceStr,
          'signType': payParam.signType,
          'paySign': payParam.paySign,
          'success': function (res) {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=true',
            })
          },
          'fail': function (res) {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=false',
            })
          }
        })
      }
    });
  },
  startPay() {
    this.requestPayParam();
  }
})