const EventEmitter = require('events').EventEmitter
// 获取到node里EventEmitter模块


class Geektime extends EventEmitter { //用Geektime 继承EventEmitter模块 并且进行 方法的重写
    constructor() {
        super();
        setInterval(() => {
            this.emit('newlesson', { price: Math.random() * 100 }) //写入一个 newlesson 的事件 并携带返回对象
            this.emit('git', { git: "git提交" }) //类似
        }, 3000)
    }
}

const geektime = new Geektime;  //声明一个实例


module.exports = geektime;