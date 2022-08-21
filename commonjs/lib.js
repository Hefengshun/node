console.log('2222');
exports.hello = 'world'
exports.add = (a, b) => {
    return a + b;
}
// setTimeout(() => {
//     console.log(exports, '这里是可以看到 addTow的方法的');
// }, 200)

module.exports = function minus(a, b) { //把整个exports 覆盖掉
    console.log('可以是一个函数');
    return a - b;
}

setTimeout(() => {
    console.log(exports, '这里exports还没走到index.js文件去添加addTwo的方法所以打印的是以上exports对象，（并且运行机制exports对象 运行时为一个参数 缓存下来了，打印相当于打印一个函数的参数）  所以打印没有被module.exports覆盖');
    console.log(module.exports, '而这里的打印是已经被覆盖了');
}, 2000)