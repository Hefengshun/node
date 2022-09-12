//1.导入模块
const express = require('express')

const expressJWT = require('express-jwt')
//导入token配置文件
const setting = require('./token/setting')

//2.创建服务器
let server = express()


server.use( //中间件要写在启动文件里面
    express.urlencoded()
)

//跨域配置   *******************一定要在token失效前，不然存在返回200没数据的问题 前端显示跨域******************
server.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Origin-Type", "*");
    next();
})

server.use(
    expressJWT.expressjwt({
        secret: setting.token.signKey, //签名的密钥
        algorithms: ['HS256']   //因为express-jwt的7.XX版本原因 在此配置algorithms算法
    }).unless({  //设置并规定那些路由不用验证token
        path: ['/login'] // 指定路由不经过token解析
    })
)
//当token失效返回提示信息 时间过期了执行这一条
server.use((err, req, res, next) => {
    // console.log(req);
    if (err.status === 401) {
        return res.send({
            status: err.status,
            msg: 'token失效',
            error: err.name + ':' + err.message
        })
    }
    // next();
});


const cors = require('cors')
server.use(cors())


const login = require('./api/login.js')
const user = require('./api/userinfo.js')
server.use('/', login)
server.use('/home', user)


//3.开启服务器
server.listen(8002, () => {
    console.log('服务器已启动,在端口号8002')
})