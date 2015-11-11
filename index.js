var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});
var user = '';
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected', {msg: ' disconnected',
                                  user: user});
  });
  socket.on('user typing', function(msg){
    if(msg.typing === true){
      io.emit('user typed', {msg: ' typing',
                             text: msg.msg,
                             user: msg.user});
    } else {
      io.emit('user typed', {msg: '',
                             user: ''});
    }
  });
  socket.on('chat message', function(msg){
    console.log('user: ' + msg.user + ' says: ' + msg.msg);
    user = msg.user;
    io.emit('chat message', msg);
  });
});

http.listen(2222, function(){
  console.log('listening on *:3000');
});
