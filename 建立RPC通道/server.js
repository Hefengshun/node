const net = require('net')

const server = net.createServer((socket) => { // 创建服务
    socket.on('data', function (buffer) {  // 接收数据
        console.log(buffer, buffer.toString()); // <Buffer e6 88 91 e5 8f aa e4 bc 9a e5 bf 83 e7 96 bc 67 69 65 67 69 65> 我只会心疼giegie
    })
})

server.listen(4000)


const data = {
    1: "id1",
    2: "id2",
    3: "id3",
    4: "id4",
    5: "id5",
    6: "id6",
    7: "id7",
    8: "id8",
    9: "id9",
}