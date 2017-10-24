var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');

//链接数据库
mongoose.connect('mongodb://127.0.0.1/001_nodeMall');

mongoose.connection.on('connected',()=>{
  console.log('MoogoDB connect success')
});

mongoose.connection.on('error',()=>{
  console.log('MoogoDB connect fail')
});

mongoose.connection.on('disconnected',()=>{
  console.log('MoogoDB connect disconnected')
});

router.get('/',function(req,res,next){
  Goods.find({},function(err,doc){
    if(err){
      res.json({
        status:'1',
        message:err.message,
      })
    }else{
      res.json({
        status:'0',
        message:'成功',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
});

module.exports = router;
