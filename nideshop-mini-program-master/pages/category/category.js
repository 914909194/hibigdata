// var util = require('../../utils/util.js');
// var api = require('../../config/api.js');
// var user = require('../../services/user.js');
// const app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var user = require('../../services/user.js');
const app = getApp();


Page({
  data: {
    // text:"这是一个页面"
    userId: '',
    navList: [],
    coursesList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 5,
    _num:0,
    currentSortOrder:'',
    isHot:'',
    isNew:'',
    order:'',
    sort:'freeprice',
    defaultSize:5,
    searchStatus:'default',
    noMore:false
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.id) {
      that.setData({
        id: parseInt(options.id),
        userId: app.globalData.userInfo.id
      });
    }
   
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });


    this.getCategoryInfo();

  }, 
  getCategoryInfo: function () {
    let that = this;
    util.request(api.CourseCategory, { id: this.data.id })
      .then(function (res) {
        if (res.errno == 0) {
          that.setData({
            navList: res.data.brotherCategory,
            currentCategory: res.data.currentCategory
          });

          //nav位置
          let currentIndex = 0;
          let navListCount = that.data.navList.length;
          for (let i = 0; i < navListCount; i++) {
            currentIndex += 1;
            if (that.data.navList[i].id == that.data.id) {
              break;
            }
          }
          if (currentIndex > navListCount / 2 && navListCount > 5) {
            that.setData({
              scrollLeft: currentIndex * 60
            });
          }
          that.getCourseList();

        } else {
          //显示错误信息
        }
        
      });
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
  getCourseList: function () {
    var that = this;
    util.request(api.CourseList, {userid:that.data.userId, categoryId: that.data.id, page: that.data.page, size: that.data.size, isHot: that.data.isHot, isNew: that.data.isNew, sort:that.data.sort,order:that.data.order})
      .then(function (res) {
        console.log(res)
        if(res.errno===0){
          // console.log(res);
          // console.log(res.data.count);
          that.setData({
            coursesList: res.data.courseList,
          });
          if(that.data.coursesList.length==res.data.count){
            that.setData({
              noMore: true,
            });
          }
        }else{
          console.log('加载出错')
        }    
    });
  },
  onUnload: function () {
    // 页面关闭
  },
  //筛选功能 新品 热门 价格排序
  menuClick:function(e){
    this.setData({
      _num: e.target.dataset.num
    })
    var that=this;
    if (e.target.dataset.course=='new'){
           that.setData({
            isNew:'0',
            isHot:'',
            size: that.data.defaultSize,
            sort:'freeprice',
            order:'',
            searchStatus: 'new',
            noMore:false
          });
           that.getCourseList();
      // util.request(api.CourseList, { categoryId: that.data.id, page: that.data.page, size: that.data.size,isNew:'0'})
      //   .then(function (res) {
      //     that.setData({
      //       coursesList: res.data.courseList,
      //     });

      //   });

    } else if (e.target.dataset.course == 'hot'){
      that.setData({
        isNew: '0',
        isHot: '',
        size: that.data.defaultSize,
        sort: 'freeprice',
        order: '',
        searchStatus:'hot',
        noMore: false
      });
      that.getCourseList();
      // util.request(api.CourseList, { categoryId: that.data.id, page: that.data.page, size: that.data.size, isHot: '0' })
      //   .then(function (res) {
      //     that.setData({
      //       coursesList: res.data.courseList,
      //     });
      //   });
    } else if (e.target.dataset.course == 'price'){
      // that.setData({
      //   searchStatus: 'price',
      // });
      let tmpSortOrder = 'asc';
      if (this.data.currentSortOrder == 'asc') {
        tmpSortOrder = 'desc';
      }
      this.setData({
        'currentSortOrder': tmpSortOrder,
         searchStatus: 'price',
         noMore: false
      });
      util.request(api.CourseList, { userid:that.userId,categoryId: that.data.id, page: that.data.page, size: that.data.defaultSize, sort: 'freeprice', order: that.data.currentSortOrder})
        .then(function (res) {
          that.setData({
            coursesList: res.data.courseList,
          });
        });
      }
  },
  //下拉加载更多数据
  bindDownLoad:function(){
    var that=this;
    if (that.data.searchStatus=='default'){
      // console.log('default哈哈哈哈哈哈')
      that.setData({
        size: that.data.size+that.data.defaultSize,
        isNew: '',
        isHot: '',
        sort: 'freeprice',
        order: '',
        searchStatus: 'default'
      });
      that.getCourseList();
    }else if(that.data.searchStatus=='new'){
      console.log('new')
      that.setData({
        size: that.data.size + that.data.defaultSize,
        isNew: '0',
        isHot: '',
        sort: 'freeprice',
        order: '',
        searchStatus: 'new'
      });
      that.getCourseList();
    } else if (that.data.searchStatus == 'hot'){
      // console.log('hot')
      that.setData({
        size: that.data.size + that.data.defaultSize,
        isNew: '',
        isHot: '0',
        sort: 'freeprice',
        order: '',
        searchStatus: 'hot'
      });
      that.getCourseList();
    } else if (that.data.searchStatus == 'price'){
      console.log(that.data.currentSortOrder)
      that.setData({
        size: that.data.size + that.data.defaultSize,
        isNew: '',
        isHot: '',
        sort: 'freeprice',
        order: '',
        searchStatus: 'price'
      });
      util.request(api.CourseList, {userid:that.data.userId,categoryId: that.data.id, page: that.data.page, size: that.data.size, sort: that.data.sort, order: that.data.currentSortOrder })
        .then(function (res) {
          that.setData({
            coursesList: res.data.courseList,
          });
          if(that.data.coursesList.length==res.data.count){
            that.setData({
              noMore: true,
            });
          }
        });
    }
      
    
  },
  switchCate: function (event) {

    if (this.data.id == event.currentTarget.dataset.id) {
      return false;
      // 
    }
    var that = this;
    that.setData({
      _num: 0,
      searchStatus: 'default', 
      noMore: false
    });
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id: event.currentTarget.dataset.id
    });

    this.getCategoryInfo();
  }
})