// try {
interview(function (res) {
    if (res) {
        return console.log("Error抛出");
    }
    console.log('smile')
})
// } catch (error) {
//     console.log('error', error);
// }


function interview(callback) {
    setTimeout(() => {

        if (Math.random() < .5) {
            callback(new Error('fail'))    //所以 错误也是通过 callback 出去
            // throw new Error('fail')  这里不会被 try catch 抓到
        } else {
            callback(null, 'sucess')
        }
    }, 500)
}