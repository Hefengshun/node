var http = require("http");
http.createServer(function (req, res) {
    // res.writehead(200);
    res.end("hello")
}).listen(3000)
// console.log(__dirname);
// const http = require("http");  //导入模块
// const server = http.createServer(function (request, response) { //创建服务
//     response.end();// 响应结束。
// });
// server.listen(8033, function () { //设置监听
//     console.log("开启成功");
// })
