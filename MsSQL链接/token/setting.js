// setting.js
module.exports = {
    token: {
        // token密匙
        signKey: '123456',
        // 过期时间
        // signTime: 3600 * 24,
        signTime: 20,
        // 请求头参数
        header: 'authorization', //header的大小写没区分
        //不用校验的路由
        unRoute: [
            { url: '/login', methods: ['POST'] },
        ]
    }
}