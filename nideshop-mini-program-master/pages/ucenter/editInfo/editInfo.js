var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    stadus:'',
    userinfo:'',
    userid:''
  },
  //微信号
  bindinputWechat(event) {
      let userinfo = this.data.userinfo;
      userinfo.wechat = event.detail.value;
      this.setData({
        userinfo: userinfo
      });
  },
  //用户姓名
  bindinputName(event) {
      let userinfo = this.data.userinfo;
      userinfo.realname = event.detail.value;
      this.setData({
        userinfo: userinfo
      });
  },
  //手机号
  bindinputMobile(event) {
    let userinfo = this.data.userinfo;
    userinfo.mobile = event.detail.value;
    this.setData({
      userinfo: userinfo
    });
  },
  
 //邮箱
  bindinputEmail(event){
    let userinfo = this.data.userinfo;
    userinfo.email = event.detail.value;
    this.setData({
      userinfo: userinfo
    });
  },
  //公司
  bindinputCompany(event) {
    let userinfo = this.data.userinfo;
    userinfo.company = event.detail.value;
    this.setData({
      userinfo: userinfo
    });
  },
  //职位
  bindinputPosition(event) {
    let userinfo = this.data.userinfo;
    userinfo.position = event.detail.value;
    this.setData({
      userinfo: userinfo
    });
  },
  bindinputIntroduction(event) {
    let userinfo = this.data.userinfo;
    userinfo.introduction= event.detail.value;
    this.setData({
      userinfo: userinfo
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      stadus:options.stadus,
      userid: app.globalData.userInfo.id || '',
    });
    if (this.data.userid) {
      this.getUserInfo();
    } else {
      wx.showToast({ title: '请先登录' });
    }
  },
  getUserInfo() {
    let that = this;
    util.request(api.GetUserInfo, { userid: that.data.userid }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          userinfo: res.data.userInfo
        });
      }
      console.log(that.data.userinfo);
      console.log("用户信息+++++++++++++++++++++++++++++");
    });
  },
  onReady: function () {

  },
  
  cancel(){
    wx.navigateTo({
      url: '/pages/ucenter/useredit/useredit',
    })
  },
  //保存修改内容
   formSubmit(){
    console.log(this.data.userinfo)
    if(this.data.userid){
      let userinfo = this.data.userinfo;

      if (userinfo.realname == '') {
        util.showErrorToast('请输入姓名');
        return false;
      }
      if (userinfo.mobile == '') {
        util.showErrorToast('请输入手机号码');
        return false;
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(userinfo.mobile))){
        util.showErrorToast('手机号格式不正确');
        return false;
      }
      if (userinfo.wechat == '') {
        util.showErrorToast('请输入微信号');
        return false;
      }
      if (userinfo.email == '') {
        util.showErrorToast('请输入邮箱');
        return false;
      } else if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(userinfo.email))) {
        util.showErrorToast('邮箱格式不正确');
        return false;
      }
      if (userinfo.company == '') {
        util.showErrorToast('请输入公司');
        return false;
      }
      if (userinfo.position == '') {
        util.showErrorToast('请输入职位');
        return false;
      }

      let that = this;
      util.request(api.Updateuserinfo, {
        userid: that.data.userid, userinfo: that.data.userinfo
      }, 'POST').then(function (res) {
        console.log(res);
        if (res.errno === 0) {
          wx.navigateTo({
            url: '/pages/ucenter/useredit/useredit',
          })
        } else {
          util.showErrorToast('修改失败');
        }
      });
    }else{
      util.showErrorToast('请先登录');
    }

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})