var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
     
Page({
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartCourseCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png",
    courseDetail:{},
    userHasCollect:0, 
    userid:'',
    courseid:'',
    freeprice:'',
    price:'',
    listimg:'',
    coursename:'',
    commenList:[],
    commentCount:0,
    page:1,
    size:5,
    comment:'',
    inputvalue:''
  },
  //获取课程详情
  getGoodsInfo: function () {
    let that = this;
    util.request(api.CourseDetail, { courseid: that.data.courseid, userid: that.data.userid }).then(function (res) {
      if (res.errno === 0) {
        console.log(res); 
        console.log('课程详情+++++++++++++++++++++===================================');
        that.setData({
          courseDetail: res.data.courseInfo,
          // userHasCollect:res.data.userHasCollect,
          freeprice: res.data.courseInfo.freeprice,
          price: res.data.courseInfo.price,
          listimg: res.data.courseInfo.img,
          coursename: res.data.courseInfo.title,
          userHasCollect: res.data.userHasCollect,
          paystatus: res.data.courseInfo.pay_status*1
        });
        console.log(res.data.courseInfo.pay_status);
        console.log('真实支付状态+++++++++++++++++++++++++++++++++++++++++++++++');
        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        // WxParse.wxParse('goodsDetail', 'html', res.data.info.course_desc, that);

        // that.getGoodsRelated();
      }
    });

  },

  //获取评论列表
  getCommentList:function(){
    let that = this;
  
    util.request(api.CommentList, { typeid:'1', valueid: that.data.courseid,page:that.data.page,size:that.data.size}).then(function (res) {
      console.log(res);
      console.log('这是评论列表============================');
      if (res.errno === 0) {
        that.setData({
          commenList: res.data.data,
          commentCount:res.data.count
        });
      }
    });
  },
  //获取评论内容
  comment: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //分享转发功能
  onShareAppMessage: function () {
    let that = this;
    return {
      title: that.data.courseDetail.title,
      desc: '海数据在线',
      path: '/pages/goods/goods?courseid=' + that.data.courseid,
      success: function (res) {
        console.log(res);
        console.log("分享课程成功");
      },
    }
  },
  //发表评论
  pubComment:function(){
    let that = this;
    if(that.data.userid){
      util.request(api.PubComment, { userid: that.data.userid, typeid: '1', valueid: that.data.courseid, content: that.data.comment }, 'POST').then(function (res) {
        console.log(res);
        console.log('这是发表评论============================');
        if (res.errno === 0) {
          that.setData({
            inputvalue: ''
          });
          that.getCommentList();
        }
      });
    }else{
      wx.showToast({ title: '请先登录' });
    }
    
  }, 
  clickSkuValue: function (event) {
    let that = this;
    let specNameId = event.currentTarget.dataset.nameId;
    let specValueId = event.currentTarget.dataset.valueId;

    //判断是否可以点击

    //TODO 性能优化，可在wx:for中添加index，可以直接获取点击的属性名和属性值，不用循环
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].specification_id == specNameId) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      'specificationList': _specificationList
    });
    //重新计算spec改变后的信息
    // this.changeSpecInfo();

    //重新计算哪些值不可以点击
  },

  //获取选中的规格信息
  getCheckedSpecValue: function () {
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      let _checkedObj = {
        nameId: _specificationList[i].specification_id,
        valueId: 0,
        valueText: ''
      };
      for (let j = 0; j < _specificationList[i].valueList.length; j++) {
        if (_specificationList[i].valueList[j].checked) {
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }

    return checkedValues;

  },
  //根据已选的值，计算其它值的状态
  setSpecValueStatus: function () {

  },
  //判断规格是否选择完整
  isCheckedAllSpec: function () {
    return !this.getCheckedSpecValue().some(function (v) {
      if (v.valueId == 0) {
        return true;
      }
    });
  },
  getCheckedSpecKey: function () {
    let checkedValue = this.getCheckedSpecValue().map(function (v) {
      return v.valueId;
    });

    return checkedValue.join('_');
  },

  onLoad: function (options) {
    // console.log(options);
    // console.log('页面初始化 options为页面跳转所带来的参数')
    // console.log(options.id);
    // 
    this.setData({
      id: parseInt(options.id),
      courseid: options.courseid,
      userid: app.globalData.userInfo.id||'',
    });
    console.log(this.data.userid);
    console.log("这是userid++++++++++++++++++++++");
    var that = this;
    this.getGoodsInfo();
    this.getCommentList();
    //获取课程总数
    util.request(api.CartCourseCount, {userid: that.data.userid},'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          cartCourseCount: res.data.cartTotal.courseCount
        });
        
      }
    });
  },
  //提醒用户已经购买了该课程无需重复购买
  buyCourseed:function(){
    wx.showToast({ title: '无需重复购买' });
  },
  onReady: function () {
    // 页面渲染完成

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
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr,
        collectBackImage: "/static/images/detail_back.png"
      });
    }
  },
  //课程收藏功能
  closeAttrOrCollect: function () {
    let that = this;
    if(that.data.userid){
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
        util.request(api.CollectCourse, { typeid: 0, valueid: that.data.courseid, userid: that.data.userid })
          .then(function (res) {
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
    }else{
      wx.showToast({
        title: '请先登录',
      })
    }
   

  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  buyCourse:function(){
    var that = this; 
   
   
    if(that.data.userid){
      util.request(api.BuyNow, { userid: that.data.userid, courseid: that.data.courseid, freeprice: that.data.freeprice, price: that.data.price, listimg: that.data.listimg, coursename: that.data.coursename }, 'POST').then(function (res) {
       console.log(res);
       console.log("立即购买+++++++++++++++++++++++++++++++++++++++")
        if (res.errno === 0) {
          var str = res.data.payInfo;
          var jsons = JSON.parse(str);
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
                    url: '../catalog/catalog'
                  })
                }
              });
            }
          })

        } else {
          util.showErrorToast('购买失败');
        }
      });
    }else{
      wx.showToast({
        title: '请先登录'
      });
    }
  
  },
//添加购物车
  addToCart: function () {
    var that = this;
    if(that.data.userid){
      console.log(this.data.userid);
      console.log(this.data.courseid);
      util.request(api.CartAdd, { userid: this.data.userid, courseid: this.data.courseid }, "POST").then(function (res) {
        console.log(res)
        console.log('添加购物车++++++++++++++++++++')
        if (res.errno === 0) {
          that.setData({
            cartCourseCount: res.data.cartTotal.courseCount
          });
          wx.showToast({
            title: '添加成功'
          });
        } else {
          util.showErrorToast('请勿重复添加');
        }

      });
    }else{
      wx.showToast({
        title: '请先登录'
      });
    }

  },
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  }
})