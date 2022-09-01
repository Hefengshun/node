const http = require("http");  //导入模块
const fs = require("fs")
const url = require("url")
const express = require('express')
var sql = require('mssql')
//链接方式："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
sql.connect("mssql://sa:123456@localhost:1433/bk_stores").then(function () {
    //Query
    new sql.Request().query('select * from Table_1').then(function (recordset) {
        console.log(recordset);
    }).catch(function (err) {
        console.log(err);
    })
    // Stored Procedure
}).catch(function (err) {
    console.log(err);
})
// const queryString = require("querystring") //插件已经失效
const queryString = require("./queryString")
const palyFun = require("./lib")
let addUp = 0;
let playLast = null //记录上一次的操作
let sameCount = 1;  //记录连续出同一个动作  因为第一次出拳条件不会成立

const app = express();  //生成一个应用的实例

// app.use(function (request, response) {

// })

app.get('/favicon.ico', function (request, response) {
    response.status(200) //简化版
    // response.writeHead(200)
    // response.end();
    return;
})

app.get('//game',
    function (request, response, next) {
        console.log(1);
        if (addUp == 3 || sameCount == 400) {
            // response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况
            // response.end('玩个锤子🔨~')
            response.status(500); //简化
            response.send('玩个锤子🔨~')
            return;
        }
        next();
        if (response.playWon) {
            addUp += 1;
        }
    },
    function (request, response, next) { //当逻辑很长时 可以加一个next 放下去  中间键的能力后面可以加一个回调函数  next是一个普通函数  不是一个异步函数
        console.log(2);
        // const parsedUrl = url.parse(request.url)
        // const query = queryString(parsedUrl.query)
        const query = request.query  //简化这样就可以取到
        console.log(query, 'obj');
        const palyerAction = query.action
        const result = palyFun(palyerAction);
        if (sameCount >= 3) {
            response.status(400)   //转化
            response.send('一直出一样的是什么意思🔨~')
            // response.writeHead(400, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况 400 是用户产生错误
            // response.end('一直出一样的是什么意思🔨~')
            sameCount = 400;
            return;
        }
        if (playLast && playLast == palyerAction) {
            sameCount++;
        } else {
            sameCount = 1;
        }
        playLast = palyerAction // 赋值要在逻辑后
        response.result = result // 结果还是要传下去的
        next()
    },
    function (request, response) {
        console.log(3);
        const result = response.result
        response.status(200); //简化
        // if (result == 0) {
        //     response.end('平局了~')
        // } else if (result == 1) {
        //     response.end('你赢了~')
        //     response.playWon = true  //结果

        // } else {
        //     response.end('你输了~')
        // }
        setTimeout(() => {                     //1.这里延迟了500毫秒返回了 但是触发了异步任务  但是next是普通函数到这里就结束了 这个异步任务就会放在下一个事件循环 新启一个调用栈 去执行定时器里面的函数  
            if (result == 0) {                 //2.这个时候才会给response.playWon = true 挂上这个字段 而上面判断response.playWon已经执行结束了 导致赢三次的功能失效 
                response.end('平局了~')
            } else if (result == 1) {
                response.end('你赢了~')
                response.playWon = true  //结果

            } else {
                response.end('你输了~')
            }
        }, 500)
    }
)

app.get('/', function (request, response) {
    // response.send(fs.readFileSync(__dirname + '/index.html'))  //简化  成下载了
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))  //简化  网页正常加载
    // response.writeHead(200)
    // fs.createReadStream(__dirname + '/index.html').pipe(response)
})

app.listen(8033) //监听端口