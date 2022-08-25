// const http = require("http");  //导入模块
// const fs = require("fs")
// const server = http
//     .createServer(function (request, response) { //创建服务
//         // console.log(request.url, response);
//         if (request.url == '/favion.ico') {
//             response.writeHead(200)
//             response.end()
//             return;
//         }
//         console.log(request.url);
//         response.writeHead(200);   //状态
//         fs.createReadStream(__dirname + '/index.html').pipe(response)
//         // response.end();// 响应结束。
//     });
// server.listen(8033, function (request, response) { //设置监听
//     // console.log(request, response);
//     console.log("开启成功");
// })





const http = require("http");  //导入模块
const fs = require("fs")
const url = require("url")
// const queryString = require("querystring") //插件已经失效
const queryString = require("./queryString")
const palyFun = require("./lib")
let addUp = 0;
let playLast = null //记录上一次的操作
let sameCount = 0;
const server = http
    .createServer(function (request, response) { //创建服务
        const parsedUrl = url.parse(request.url)
        if (request.url == '/favion.ico') {
            response.writeHead(200)
            response.end()
            return;
        }
        // console.log(parsedUrl.query, parsedUrl, 'parsedUrl.query'); //一定要打印看一下里面的参数
        if (parsedUrl.pathname == '//game') {
            const query = queryString(parsedUrl.query)
            console.log(query, 'obj');
            const palyerAction = query.action
            playLast = palyerAction
            const result = palyFun(palyerAction);
            response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况
            if (addUp == 3 || sameCount == 400) {
                response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况
                response.end('玩个锤子🔨~')
                return;
            }
            if (playLast && playLast == palyerAction) {
                sameCount++;
            } else {
                sameCount = 0;
            }
            if (sameCount >= 3) {
                response.writeHead(400, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况 400 是用户产生错误
                response.end('一直出一样的是什么意思🔨~')
                sameCount = 400;
                return;
            }
            if (result == 0) {
                response.end('平局了~')
            } else if (result == 1) {
                response.end('你赢了~')
                addUp += 1
            } else {
                response.end('你输了~')
            }
        }
        if (request.url === '/') {
            fs.createReadStream(__dirname + '/index.html').pipe(response)
        }
        // console.log(request.url);
        // response.writeHead(200);   //状态
        // response.end();// 响应结束。
    });
server.listen(8033, function (request, response) { //设置监听
    // console.log(request, response);
    console.log("开启成功");
})
