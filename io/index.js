const glob = require("glob")
console.log(glob);
var result = null;

// result = glob.sync(__dirname, "/**/*", function (err, res) {
//     result = res
//     console.log(result);
// })

// options 是可选的
glob("**/*.js", options, function (er, files) {
    // files 是匹配到的文件的数组.
    console.log(files);
    // 如果 `nonull` 选项被设置为true, 而且没有找到任何文件,那么files就是glob规则本身,而不是空数组
    // er是当寻找的过程中遇的错误
})
console.log(result);