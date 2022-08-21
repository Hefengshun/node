// console.log("大哥大");
// console.log(__filename);
// console.log(__dirname);
console.log(process.argv);
var playerAction = process.argv[process.argv.length - 1];
console.log(playerAction);

var random = Math.random() * 3;
var computerAction;
if (random < 1) {
    computerAction = 'rock';
} else if (random > 2) {
    computerAction = 'scissor';
} else {
    computerAction = 'paper'
}
console.log("computerAction", computerAction);
if (computerAction == playerAction) {
    console.log('平局');
} else if (
    (computerAction == "rock" && playerAction == "paper") ||
    (computerAction == "scissor" && playerAction == "rock") ||
    (computerAction == "paper" && playerAction == "scissor")
) {
    console.log("恭喜你赢了");
} else {
    console.log('你输了');
}