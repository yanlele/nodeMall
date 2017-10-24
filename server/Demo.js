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

  console.log(`url: ${req.url}`);

  res.end(util.inspect(url.parse('http://127.0.0.1:3000/index.html?a=123#tag')))
});

server.listen(3000,'127.0.0.1',()=>{
  console.log('服务器已经运行，访问路径为： http://127.0.0.1:3000')
});
