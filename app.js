require('./config.js');

var nsp_client = io.of('/clients');
var nsp_master = io.of('/master');
var nsp_notification = io.of('/notification');

/**
* Client Namespace 
* Handler connection for  users
**/
nsp_client.on('connection', function(socket){

	if(!socket.handshake.query.branch_id){
		socket.handshake.query.branch_id = "";
		socket.disconnect( true );
	}

    var branch_id = socket.handshake.query.branch_id;
    var branch_name = socket.handshake.query.branch_name;
	var user_id = socket.handshake.query.user_id;
	var username = socket.handshake.query.username;
	var token = socket.handshake.query.token;

	var new_client = {
		'issued' : socket.handshake.issued,
		'socket_id' : socket.id,
		'user_id' : user_id,
		'branch_id' : branch_id,
        'username' : username,
        'branch_name' : branch_name,
        'token' : token
	};
	// io.of('/master').emit('new_user_added', new_client );
    // io.of('/clients').emit('new_user_added', new_client );

    socket.on('msg', function(data){
        console.log(data);
    });
    
    console.log('Connected', new_client);

	socket.on('disconnect', function () {
        console.log('disconnected');
		// io.of('/master').emit('user_removed', new_client );
	});

	

});