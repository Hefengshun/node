const fs = require("fs")
const koa = require('koa')  //核心功能  暂停执行
const koaMount = require('koa-mount')  // koa 模块是不带路由的  所以安装koa-mount路由
const palyFun = require("./lib");
let addUp = 0;
let playLast = null //记录上一次的操作
let sameCount = 1;  //记录连续出同一个动作  因为第一次出拳条件不会成立

const app = new koa();  //声明一个koa的实例

app.use(
    koaMount('/favicon.ico',
        function (ctx) { //里面没有异步任务 所以一个普通函数就行
            ctx.status = 200;
        })
)
const gameKoa = new koa();  //把这个koa 丢到app的koa里面
app.use(
    koaMount(
        '//game',
        gameKoa
    )
)
gameKoa.use(
    async function (ctx, next) {
        console.log(1);
        if (addUp == 3) {
            // response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" }); //解决中文乱码的情况
            // response.end('玩个锤子🔨~')
            ctx.status = 500; //简化
            ctx.body = '玩个锤子🔨~';
            return;
        }
        await next();
        if (ctx.playWon) {
            addUp += 1;
        }
    },
)
gameKoa.use(
    async function (ctx, next) {
        console.log(2);
        const query = ctx.query  //简化这样就可以取到
        console.log(query, 'obj');
        const palyerAction = query.action
        const result = palyFun(palyerAction);
        if (sameCount == 400) {
            ctx.status = 500; //简化
            ctx.body = '玩个锤子🔨~'
            return;
        }
        if (sameCount >= 3) {
            ctx.status = 400;   //转化
            ctx.body = '一直出一样的是什么意思🔨~';
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
        ctx.result = result // 结果还是要传下去的
        await next()
    }
)

gameKoa.use(
    async function (ctx, next) {
        console.log(3);
        const result = ctx.result
        ctx.status = 200;

        await new Promise(resolve => {
            setTimeout(() => {
                if (result == 0) {
                    ctx.body = '平局了~'
                } else if (result == 1) {
                    ctx.body = '你赢了~'
                    ctx.playWon = true  //结果

                } else {
                    ctx.body = '你输了~'
                }
                resolve();
            }, 500)
        }
        )
    }
)

app.use(
    koaMount('/',    //页面要放在最后去渲染  上面一旦有条件return 就代表结束了,
        function (ctx) {  //里面没有异步任务 所以一个普通函数就行
            ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
        })
)
app.listen(8033) //监听端口