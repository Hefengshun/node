var playerAction = process.argv[process.argv.length - 1];
var play = require('./lib.js')

// const result = play(playerAction)
// console.log(result);      这样写程序运行一次 进程就完结了


let count = 0;

process.stdin.on('data', e => {     //实现进程持续
    const playerAction = e.toString().trim();

    // console.log(playerAction);
    const result = play(playerAction);

    console.log(result);
    if (result == -1) {
        count += 1;
    }
    if (count == 3) {
        console.log('你太厉害了，我不玩了');
        process.exit();  //进程 关闭
    }
})