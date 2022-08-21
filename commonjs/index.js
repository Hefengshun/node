console.log('1111');
var result = require('./lib.js')
// console.log('3333', result, result.add(2, 3));
console.log('3333', result,);  // 加载到这里后 lib文件里的exports为函数       
result.addTwo = () => {
    //但是这里又给（result==module.exports）添加了一个属性 导致lib文件里的exports又添加一个对象属性  所以就变成了 [Function: minus] { addTwo: [Function (anonymous)] }  一个函数一个对象,
    console.log("修改了lib文件里的exports");
}
console.log(result, 'result');