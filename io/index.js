const glob = require("glob")
console.log(glob);
var result = null;

result = glob.sync(__dirname, "/**/*")

console.log(result);