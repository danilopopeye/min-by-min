var
	http = require('http'),
	io = require('./Socket.IO-node'),
	MM = require('./mm/index'),
	server, socket;

server = http.createServer( MM.Server.create );
server.listen(8080, 'localhost');

socket = io.listen(server);
socket.on( 'connection', MM.Socket.onConnection );
