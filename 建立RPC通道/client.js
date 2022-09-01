const net = require('net')
const socket = new net.Socket({}) // 和http模块完全不一样

socket.connect({
    host: '127.0.0.1',
    port: 4000
})

socket.write("我只会心疼giegie") // 向服务端发送   //单工通讯


const lessonid = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
]