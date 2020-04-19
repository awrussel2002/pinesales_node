global.app = require('express')();
global.http = require('http').Server(app);
global.io = require('socket.io')(http);

global.socketioJwt   = require("socketio-jwt");
global.mysql = require('mysql');

http.listen(3000, function(){
  console.log('listening on *:3000');
});
io.use(socketioJwt.authorize({
	secret: 'k93hjj98ys8gfksm74nik709kmkdjgkh9784hf8y3ruskf874hfkdnjdj9du58fh',
	handshake: true
}));

global.DB = function() {
	var db = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    database: 'pine_main',
	    password: ''
	});
    return db;
}