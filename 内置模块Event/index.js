const geektime = require('./lib.js')

geektime.addListener('newlesson', (res) => {  //绑定这个事件调用  回调函数携带方法重新时 携带的参数
    //这里可以写出逻辑
    if (res.price < 50) {
        console.log(res, "收到小于50的参数");
    }
})

geektime.addListener('git', (res) => {
    console.log('调用了git方法', res);
})