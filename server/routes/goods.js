var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接数据库
mongoose.connect('mongodb://127.0.0.1/001_nodeMall');

mongoose.connection.on('connected', () => {
  console.log('MoogoDB connect success')
});

mongoose.connection.on('error', () => {
  console.log('MoogoDB connect fail')
});

mongoose.connection.on('disconnected', () => {
  console.log('MoogoDB connect disconnected')
});

//正式功能接口
router.get('/', (req, res, next) => {
  let page=req.param('page');
  let pageSize=req.param('pageSize');
  let sort = req.param('sort');
  let skip=(page-1)*pageSize;
  let params = {};

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({
    salePrice:sort
  });

  goodsModel.exec({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        message: '成功',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});


/*测试接口*/
router.get('/test', function (req, res, next) {
  var param = {
    name: req.param('name'),
    age: req.param('age')
  };

  console.log(param);

  Goods.find({}, (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    } else {
      res.json({
        success: true,
        message: '查询成功',
        name: param.name,
        age: param.age,
        data: {
          list: data
        }
      })
    }
  })
});

module.exports = router;
