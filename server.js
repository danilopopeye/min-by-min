var
	http = require('http'),
	io = require('./Socket.IO-node'),
	sys = require('sys'),
	MM = require('./mm'),
	server, socket, messages;

server = http.createServer( MM.Server.create );
server.listen(8080);

socket = io.listen(server);

socket.on('connection', function( client ){
  client.send({ buffer: messages });
  client.broadcast({
  	announcement: client.sessionId + ' connected'
  });

	// client sends a message
	client.on('message', function( content ){
		client.broadcast({
			from: client.sessionId,
			message: content
		});
	});

	// client disconnect
	client.on('disconnect', function(){
		client.broadcast({
			announcement: client.sessionId + ' disconnected'
		});
	});
});
