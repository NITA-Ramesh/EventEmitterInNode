const server = require('net').createServer();


let counter = 0 ;
let sockets = {} ;
// TODO time Using moment.js
function timestamp(){
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
}
server.on('connection', socket => {
    socket.id = counter++;

    console.log('Client Connected');
    socket.write('Please Type your name: ');

    socket.on('data', data => {
        if(!sockets[socket.id]){
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name} ! \n`);
            sockets[socket.id] = socket;
            return ;
        }
        Object.entries(sockets).forEach(([key , clientSocket]) => {
            if(socket.id == key )
             return;
            clientSocket.write(`${timestamp()} ` );
            clientSocket.write(`${socket.name}:- `);
            clientSocket.write(data);
            
        })
    })
    socket.on('end', () =>{
        delete sockets[socket.id];
        console.log('Client Disconnected');
    })
})

server.listen(8000, () => console.log('Server bound'))
// node net.js
// nc localhost 8000 