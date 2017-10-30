var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 * 登录逻辑
 * 入参：
 * userName
 * userPwd
 */
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param, function (err, doc) {
    if (err) {
      res.status(200).json({
        status: '1',
        message: err.message
      })
    } else {
      if (doc) {
        //保存到cookie
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });

        res.cookie('userName', doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        //用户信息保存到session
        // req.session.user=doc;

        res.status(200).json({
          status: '0',
          message: '登录成功',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '登录失败，用户名或者密码输入失误'
        })
      }
    }
  })
});

/**
 * 登出功能
 */
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });

  res.status(200).json({
    status: '0',
    message: '登出成功'
  })
});

/*
 * 登录校验
 * */
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.status(200).json({
      status: '0',
      message: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    res.status(200).json({
      status: '1',
      message: '未登录',
      result: ''
    })
  }
});

/*购物车信息加载
 *
 * */
router.get('/cartList', function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '查询购物车列表成功',
          result: doc.cartList
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '没有商品加入购物车',
          result: ''
        })
      }
    }
  })
});

/*购物车删除功能*/
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId;
  User.update({userId: userId}, {
    //$pull是删除的功能
    $pull: {
      'cartList': {
        productId: productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '删除成功',
          result: ''
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '商品不存在',
          result: ''
        })
      }
    }
  })
});


/*控制购物车的修改
* 入参
* productId
* productNum
* */
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked=req.body.checked;
  //修改数据库信息的操作方法
  User.update({
    "userId":userId,
    "cartList.productId":productId
  },{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },function(err,doc){
    if (err) {
      res.status(500).json(err);
    } else {
      if (doc) {
        res.status(200).json({
          status: '0',
          message: '更新成功',
          result: ''
        })
      } else {
        res.status(200).json({
          status: '1',
          message: '更新失败',
          result: ''
        })
      }
    }
  })
});

/*购物车全选功能
* 入参：
* checkAll
* */
router.post("/editCheckAll", function (req,res,next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId:userId}, function (err,user) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked = checkAll;
        })
        user.save(function (err1,doc) {
          if(err1){
            res.json({
              status:'1',
              msg:err1,message,
              result:''
            });
          }else{
            res.json({
              status:'0',
              msg:'',
              result:'suc'
            });
          }
        })
      }
    }
  });
});

/*查询地址接口*/
router.get('/addressList',function(req,res,next){
  let userId=req.cookies.userId;
  User.findOne({
    userId:userId
  },function(err,doc){
    if(err){
      res.status(200).json(err.message)
    }else{
      res.status(200).json({
        status:'0',
        message:'查询地址成功',
        result:doc.addressList
      })
    }
  })
});




module.exports = router;
