let user = require('./User');

console.log(`userName:${user.userName}`);
console.log(`i am jack ,i say ${user.userName}`);


/*创建一个server*/
let http=require('http');
let server= http.createServer((req,res)=>{
  res.statusCode=200;
  res.setHeader('Conent-Type','text/plain; charset=utf-8');

  res.end('Hello , node.js')
});

server.listen(3000,'127.0.0.1',()=>{
  console.log('服务器已经运行，访问路径为： http://127.0.0.1:3000')
});
