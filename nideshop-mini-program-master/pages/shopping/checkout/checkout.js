var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data:{
    checkedCourseList: [],
    checkedAddress: {},
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00,    //快递费
    couponPrice: 0.00,     //优惠券的价格
    orderTotalPrice: 0.00,  //订单总价
    actualPrice: 0.00,     //实际需要支付的总价
    addressId: 0,
    couponId: 0,
    userId:''
  },
  onLoad:function(options){
    this.setData({
      userId: app.globalData.userInfo.id
    });
    console.log(this.data.userId);
    // 页面初始化 options为页面跳转所带来的参数

    // try {
    //   var addressId = wx.getStorageSync('addressId');
    //   if (addressId) {
    //     this.setData({
    //       'addressId': addressId
    //     });
    //   }

    //   var couponId = wx.getStorageSync('couponId');
    //   if (couponId) {
    //     this.setData({
    //       'couponId': couponId
    //     });
    //   }
    // } catch (e) {
    //   // Do something when catch error
    // }

    
  },
  getCheckoutInfo: function () {
    let that = this;
    util.request(api.CartCheckout, { userid:that.data.userId},'POST').then(function (res) {
      if (res.errno === 0) {
        console.log(res);
        that.setData({
          checkedCourseList: res.data.checkedCoursesList,
          // checkedAddress: res.data.checkedAddress,
          actualPrice: res.data.actualPrice,
          // checkedCoupon: res.data.checkedCoupon,
          // couponList: res.data.couponList,
          // couponPrice: res.data.couponPrice,
          // freightPrice: res.data.freightPrice,
          // goodsTotalPrice: res.data.goodsTotalPrice,
          // orderTotalPrice: res.data.orderTotalPrice
        });
      }
      wx.hideLoading();
      // console.log(res);
    });
  },
  selectAddress(){
    wx.navigateTo({
      url: '/pages/shopping/address/address',
    })

  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd',
    })
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    wx.showLoading({
      title: '加载中...',
    })
    this.getCheckoutInfo();
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  submitOrder: function(){

    // if (this.data.addressId <=0) {
    //   util.showErrorToast('请选择收货地址');
    //   return false;
    // }

    let that = this;
    util.request(api.BuyCourse, {userid:that.data.userId}).then(function (res) {         
    if (res.errno === 0) {
      console.log(res);
      var str = res.data.payInfo;
      var jsons = JSON.parse(str);
      // console.log(jsons)
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
              wx.switchTab({
                url: '../../catalog/catalog'
              })
            }
          });
        }
      })
    }else {
          util.showErrorToast('清不要重复支付');
    }
  });

   
  }
})