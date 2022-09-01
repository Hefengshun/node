//1.导入模块
const express = require('express')

//2.创建服务器
let server = express()
server.use(express.urlencoded()) //中间件要写在启动文件里面

const cors = require('cors')
server.use(cors())

const user = require('./api/user.js')

server.use('/', user)

//3.开启服务器
server.listen(8002, () => {
    console.log('服务器已启动,在端口号8002')
})