let user = require('./User');

console.log(`userName:${user.userName}`);
console.log(`i am jack ,i say ${user.userName}`);


/*创建一个server*/
let http=require('http');
let url=require('url');
let util=require('util');
let server= http.createServer((req,res)=>{
  res.statusCode=200;
  res.setHeader('Conent-Type','text/plain; charset=utf-8');

  console.log(`url: ${req.url}`);//得到的是域名和断后之后的url

  console.log(`parse: ${url.parse(req.url)}`);//得到的是一个对象

  console.log(`inspect: ${util.inspect(url.parse(req.rul))}`);//可以吧对象解析为字符串

  res.end(util.inspect(url.parse('http://127.0.0.1:3000/index.html?a=123#tag')))
});

server.listen(3000,'127.0.0.1',()=>{
  console.log('服务器已经运行，访问路径为： http://127.0.0.1:3000')
});
