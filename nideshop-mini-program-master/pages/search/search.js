var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    keywrod: '',
    searchStatus: false,
    courseList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    // currentSortOrder: '',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 4,
    // currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0,
    userid:'',
    noMore:false,
    defaultSize:4,
    searchFilter:'default'
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function () {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.setData({
      userid: app.globalData.userInfo.id
    });
    this.getSearchKeyword();
  },
  
  getSearchKeyword() {
    let that = this;
    util.request(api.SearchIndex).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          historyKeyword: res.data.historyKeywordList,
          defaultKeyword: res.data.defaultKeyword,
          hotKeyword: res.data.hotKeywordList
        });
      }
    });
  },

  inputChange: function (e) {

    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    this.getHelpKeyword();
  },
  getHelpKeyword: function () {
    let that = this;
    util.request(api.SearchHelper, { keyword: that.data.keyword }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          helpKeyword: res.data
        });
      }
    });
  },
  inputFocus: function () {
    this.setData({
      searchStatus: false,
      courseList: []
    });

    if (this.data.keyword) {
      this.getHelpKeyword();
    }
  },
  clearHistory: function () {
    this.setData({
      historyKeyword: []
    })

    util.request(api.SearchClearHistory, {}, 'POST')
      .then(function (res) {
        console.log('清除成功');
      });
  },
  getCourseList: function () {
    let that = this;

    util.request(api.CourseList, {userid:that.data.userid, keyword: that.data.keyword, page: that.data.page, size: that.data.size, sort: that.data.currentSortType, order: that.data.currentSortOrder, categoryId: that.data.categoryId }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          searchStatus: true,
          categoryFilter: false,
          courseList: res.data.data,
          filterCategory: res.data.filterCategory,
          page: res.data.currentPage,
          size: res.data.numsPerPage
        });
        if(res.data.count==that.data.courseList.length){
          that.setData({
            noMore:true
          })
        }
        console.log(res)
        console.log('哈哈哈哈')
        // console.log(res);
      }

      //重新获取关键词
      that.getSearchKeyword();
    });
  },
  //下拉加载更多
  bindDownLoad: function () {
    console.log(this.data.searchFilter);
    var that = this;
    if (that.data.searchFilter== 'default') {
      that.setData({
        size: that.data.size + that.data.defaultSize,
        sort: 'freeprice',
        order: '',
        searchFilter: 'default'
      });
      that.getCourseList();
    } else if (that.data.searchFilter== 'price') {
      console.log('price');
      that.setData({
        size: that.data.size + that.data.defaultSize,
        sort: 'freeprice',
        order: '',
        searchStatus: 'price'
      });
      that.getCourseList();
    } else if (that.data.searchFilter == 'categoryFilter') {
      console.log('categoryFilter')
      that.setData({
        size: that.data.size + that.data.defaultSize, 
        sort: 'freeprice',
        order: '',
        searchStatus: 'categoryFilter'
      });
      that.getCourseList();
    }

  },
  onKeywordTap: function (event) {

    this.getSearchResult(event.target.dataset.keyword);

  },
  getSearchResult(keyword) {
    this.setData({
      keyword: keyword,
      page: 1,
      categoryId: 0,
      // goodsList: []
      courseList:[]
    });
    this.getCourseList();
  },
  openSortFilter: function (event) {
    let currentId = event.currentTarget.id;
    switch (currentId) {
      case 'categoryFilter':
        this.setData({
          'categoryFilter': !this.data.categoryFilter,
          'currentSortOrder': 'asc',
          'currentSortType': 'category',
          searchFilter:'categoryFilter',
          size:this.data.defaultSize
           
        });
        break;
      case 'priceSort'://按优惠价格排序
        let tmpSortOrder = 'asc';
        if (this.data.currentSortOrder == 'asc') {
          tmpSortOrder = 'desc';
        }
        this.setData({
          'currentSortType': 'freeprice',
          'currentSortOrder': tmpSortOrder,
          'categoryFilter': false,
          searchFilter: 'price',
          size: this.data.defaultSize
        });

        this.getCourseList();
        break;
      default:
        //综合排序
        this.setData({
          'currentSortType': 'default',
          'currentSortOrder': 'desc',
          'categoryFilter': false,
          searchFilter: 'default',
          size: this.data.defaultSize
        });
        this.getCourseList();
    }
  },
  selectCategory: function (event) {
    let currentIndex = event.target.dataset.categoryIndex;
    let filterCategory = this.data.filterCategory;
    let currentCategory = null;
    for (let key in filterCategory) {
      if (key == currentIndex) {
        filterCategory[key].selected = true;
        currentCategory = filterCategory[key];
      } else {
        filterCategory[key].selected = false;
      }
    }
    this.setData({
      'filterCategory': filterCategory,
      'categoryFilter': false,
      categoryId: currentCategory.id,
      size:this.data.defaultSize,
      courseList: []
    });
    this.getCourseList();
  },
  onKeywordConfirm(event) {
    this.getSearchResult(event.detail.value);
  }
})