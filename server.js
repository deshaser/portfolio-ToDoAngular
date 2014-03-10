var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    db = require('./libs/mongoose');

server.listen(3000);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
})
app.use(express.static(__dirname + '/static'));

io.sockets.on('connection', function(socket){
    socket.on('send todo', function(data) {
        console.log(data)
        io.sockets.emit('new todo', data);
    });
});