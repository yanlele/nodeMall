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
  console.log(req.param());

  res.json({
    success:true,
    message:'成功',
    data:{
      name:'yanle',
      age:25
    }
  })
});

router.get('/test',function(req,res,next){
  Goods.find({},(err,data)=>{
    if(err){
      res.json({
        success:false,
        message:err.message
      })
    }else{
      res.json({
        success:true,
        message:'查询成功',
        data:{
          list:data
        }
      })
    }
  })
})

module.exports = router;
