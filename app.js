//參考https://github.com/rauchg/chat-example把express版本改成koa的版本
var http = require('http');
var koa = require('koa');//把原本用express模組改成koa的模組
var app = koa();//寫一個變數app引用koa模組
var send = require('koa-send');//寫一個變數send引用koa-sned模組因為yield有用到send指令

app.use(function* (next) {
  if (this.path !== '/') return yield next;
  yield send(this, __dirname + '/index.html');
});//把原本顯示index.html到網頁的方法改成koa模組裡的yield的模式

var server = http.createServer(app.callback());
var io = require('socket.io')(server);//把原本express模組引用socket.io的方法改成koa模組引用socket.io

io.on('connection', function (socket) {
  socket.on('chat message', function (data) {
    console.log(data);
    io.emit('chat message', data);
  });
});//沿用原本的版本

var port = process.env.PORT || 3000;
server.listen(port);
console.log ('Listening at port ' + port + ' ...');
