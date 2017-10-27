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
        //用户信息保存到session
        // req.session.user=doc;

        res.status(200).json({
          status: '0',
          message: '登录成功',
          result: {
            userName: doc.userName
          }
        })
      }else{
        res.status(200).json({
          status:'1',
          message:'登录失败，用户名或者密码输入失误'
        })
      }
    }
  })
});

/**
 * 登出功能
 */
router.post('/logout',function(req,res,next){
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  });

  res.status(200).json({
    status:'0',
    message:'登出成功'
  })
});


/**
 * 这里留下了一个非常坑的代码纠正逻辑
 * 使用findOne({param},(err,data)={})  这种方式中的err是返回的异常，如果数据库中没有查询到数据，要对data进行校验
 */
router.get('/test', function (req, res, next) {
  let param = {
    userName: 'tom',
    userPwd: 123456
  };

  User.findOne(param).then((doc) => {
    if(doc){
      res.status(200).json({
        status:'0',
        message:'登录成功',
        result:{
          userName:doc.userName
        }
      })
    }else{
      res.status(401).json({
        status:'1',
        message:'登录失败，用户名或者密码输入失误'
      })
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
});


module.exports = router;
