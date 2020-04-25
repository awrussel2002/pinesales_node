require('./config.js');

var nsp_client = io.of('/clients');
var nsp_admin = io.of('/admin');
var nsp_notification = io.of('/notification');

nsp_admin.on('connection', function(socket){

    // console.log( socket.handshake.query );
    socket.on('disconnect', function () {
        // console.log('admin disconnected');
		// io.of('/master').emit('user_removed', new_client );
    });

    /**
     * Get List of connected users
     */
    socket.on('getUser', function(data){
        console.log(data);
        var clients = io.of('/clients').clients();
        var connected_users = [];
        for (var id in clients.connected) {
            var s_client = [];
            s_client = {
                'issued' : clients.connected[id].handshake.issued,
                'socket_id' : id,
                'user_id' : clients.connected[id].handshake.query.user_id,
                'branch_id' : clients.connected[id].handshake.query.branch_id,
                'username' : clients.connected[id].handshake.query.username,
                'branch_name' : clients.connected[id].handshake.query.branch_name
            };
            connected_users.push(s_client);
        }
        console.log(connected_users.length);
        socket.emit('online_user_list', connected_users);
    });

});
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
        // console.log(data);
    });

    io.of('/admin').emit('new_user_added', new_client );
    
    // console.log('Connected', new_client);

	socket.on('disconnect', function () {
        io.of('/admin').emit('user_removed', new_client );
	});

	

});