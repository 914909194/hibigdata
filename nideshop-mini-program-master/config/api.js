var NewApiRootUrl = 'http://hismartlab.cn:8360/api/';
// var NewApiRootUrl = 'http://127.0.0.1:8360/api/';
  
module.exports = {
    IndexUrl: NewApiRootUrl + 'index/index', //首页数据接口
    CatalogList: NewApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
    CatalogCurrent: NewApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口


    GetUserInfo: NewApiRootUrl + 'user/showuserinfo',//获取用户信息
    Updateuserinfo: NewApiRootUrl + 'user/updateuserinfo',//修改用户信息

    AuthLoginByWeixin: NewApiRootUrl + 'auth/loginByWeixin', //微信登录
    CourseCount: NewApiRootUrl + 'course/count',  //统计商品总数
    CourseList: NewApiRootUrl + 'course/list',  //获得课程列表
    CourseCategory: NewApiRootUrl + 'course/category',  //获得分类数据
    CourseDetail: NewApiRootUrl + 'course/detail',  //获得课程的详情
    CourseNew: NewApiRootUrl + 'course/new',  //新品
    CourseHot: NewApiRootUrl + 'course/hot',  //热门
    CourseRelated: NewApiRootUrl + 'goods/related',  //商品详情页的关联商品（大家都在看）
    CourseFilter: NewApiRootUrl + 'course/filter',//课程列表筛选的分类列表
    CollectCourseList: NewApiRootUrl +'collects/list',//我的课程收藏列表

    ActivityList: NewApiRootUrl + 'activity/list',  //活动列表
    ActivityCount: NewApiRootUrl + 'activity/count',  //统计在线活动个数（不包括已经结束的活动）
    ActivityDetail: NewApiRootUrl + 'activity/detail',  //活动详情
    JoinDetail: NewApiRootUrl + 'activityapply/presubmit', //报名详情
    formSubmit: NewApiRootUrl + 'activityapply/submit',//报名支付费用提交
    payStatus: NewApiRootUrl + 'activityapply/updateOrderStatus',//支付状态提交
    CancellOrder: NewApiRootUrl + 'activityapply/cancel',//取消订单
    BuyCourse: NewApiRootUrl + 'courseapply/submit',//购买课程
    BuyNow: NewApiRootUrl +'courseapply/buynow',//立即购买课程
    MyCourseList: NewApiRootUrl + 'courseapply/myCourseList',//我的课程列表
    MyCourseOrder: NewApiRootUrl + 'courseapply/list',//我的课程订单列表
    MycourseOrderDetail: NewApiRootUrl + 'courseapply/detail',//我的课程订单详情页
    CancelCourseOrder: NewApiRootUrl + 'courseapply/cancel',//取消我的课程订单
    CollectCourse: NewApiRootUrl + 'collects/addordelete',// 添加和删除我的课程收藏


    CartAdd: NewApiRootUrl + 'carts/add', // 添加课程到购物车
    CartCourseCount: NewApiRootUrl + 'carts/courseCount', // 获取购物车课程数量件数
    CartList: NewApiRootUrl + 'carts/index', //获取购物车的数据列表
    CartChecked: NewApiRootUrl + 'carts/checked', // 选择或取消选择课程
    CartDelete: NewApiRootUrl + 'carts/delete', // 删除购物车的商品
    CartCheckout: NewApiRootUrl + 'carts/checkout', // 下单前信息确认

    CartUpdate: NewApiRootUrl + 'carts/update', // 更新购物车的课程
    // CartChecked: NewApiRootUrl + 'cart/checked', // 选择或取消选择商品
    CartGoodsCount: NewApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
    CartCheckout: NewApiRootUrl + 'carts/checkout', // 下单前信息确认

    OrderSubmit: NewApiRootUrl + 'order/submit', // 提交订单
    PayPrepayId: NewApiRootUrl + 'pay/payPrepay', //获取微信统一下单prepay_id

    CollectList: NewApiRootUrl + 'collect/list',  //收藏列表
    CollectAddOrDelete: NewApiRootUrl + 'collect/addordelete',  //添加或取消收藏

    CommentList: NewApiRootUrl + 'comment/list',  //评论列表
    CommentCount: NewApiRootUrl + 'comment/count',  //评论总数
    CommentPost: NewApiRootUrl + 'comment/post',   //发表评论

    TopicList: NewApiRootUrl + 'topic/list',  //专题列表
    TopicDetail: NewApiRootUrl + 'topic/detail',  //专题详情
    TopicRelated: NewApiRootUrl + 'topic/related',  //相关专题

 
    SearchIndex: NewApiRootUrl + 'search/index',  //搜索页面数据
    SearchResult: NewApiRootUrl + 'search/result',  //搜索数据
    SearchHelper: NewApiRootUrl + 'search/helper',  //搜索帮助
    SearchClearHistory: NewApiRootUrl + 'search/clearhistory',  //搜索帮助

    AddressList: NewApiRootUrl + 'address/list',  //收货地址列表
    AddressDetail: NewApiRootUrl + 'address/detail',  //收货地址详情
    AddressSave: NewApiRootUrl + 'address/save',  //保存收货地址
    AddressDelete: NewApiRootUrl + 'address/delete',  //保存收货地址

    RegionList: NewApiRootUrl + 'region/list',  //获取区域列表
  
    OrderList: NewApiRootUrl + 'activityapply/myActivityList',  //我的活动列表
    ActivityOrderList: NewApiRootUrl +'activityapply/list',//我的活动订单列表
    OrderDetail: NewApiRootUrl + 'activityapply/detail',  //我的活动详情
    OrderCancel: NewApiRootUrl + 'activityapply/cancel',  //取消我的活动订单

    FootprintList: NewApiRootUrl + 'footprints/list',  //足迹列表
    FootprintDelete: NewApiRootUrl + 'footprints/delete',  //删除足迹

    ArticleIndex: NewApiRootUrl + 'article',  //文章初始化
    ArticleList: NewApiRootUrl + 'article/list',  //文章列表
    ArticleDetail: NewApiRootUrl + 'article/detail',//文章详情
    // ArticleSearch: NewApiRootUrl + '' ,//文章搜索


    AuthorList: NewApiRootUrl + 'article/authorlist',//作者列表
    AuthorDetail: NewApiRootUrl + 'article/authordetail',//作者详情
    AuthorArticleList: NewApiRootUrl + 'article/articleByAuthor',//通过作者查询文章列表
    AuthorArticleCount: NewApiRootUrl + 'article/authorarticlecount',//作者拥有的文章数
    AuthorHits: NewApiRootUrl + 'article/authorHits',//作者流量加一

    InfomationList: NewApiRootUrl +'information/list',//咨询列表
    InfomationDetail: NewApiRootUrl + 'information/detail',//咨询详情
    InfomationRelated: NewApiRootUrl + 'information/related',//相关咨询


    CommentList: NewApiRootUrl + 'comments/list',//评论列表
    PubComment: NewApiRootUrl + 'comments/post',//发表评论
    CommentCount: NewApiRootUrl + 'comments/count',//获取评论数

    FeedBack: NewApiRootUrl + 'feedback/suggestion',//客户意见反馈

};