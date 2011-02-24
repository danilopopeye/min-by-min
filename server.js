var
	http = require('http'),
	io = require('./Socket.IO-node'),
	MM = require('./mm/index'),
	server, socket;

// HTTP Server
server = http.createServer( MM.Server.create );
server.listen(8080);

// Comet Server
socket = io.listen( server );
socket.on( 'connection', MM.Socket.onConnection );

// alias
MM.SERVER = server;
MM.SOCKET = socket;

// Kick off
MM.Game.init();
