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
  let page=parseInt(req.param('page'))||1;
  let pageSize=parseInt(req.param('pageSize'))||8;
  let priceLevel=req.param('priceLevel')||'all';
  let sort = req.param('sort')||1;
  let skip=(page-1)*pageSize;
  let params = {};
  let priceGt='',priceLte='';
  if(priceLevel!='all'){
    switch(priceLevel){
      case '0':priceGt=0;priceLte=100;break;
      case '1':priceGt=100;priceLte=500;break;
      case '2':priceGt=500;priceLte=1000;break;
      case '3':priceGt=1000;priceLte=5000;break;
    }
    params={
      salePrice:{
        $gt:priceGt,//最大值为priceGt
        $lte:priceLte//最小值为priceLte
      }
    }
  }




  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  //按照什么规则排序1、升序   2、降序
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
