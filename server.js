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

// GAME
MM.Game = {};
MM.Game.TIME = 0;
MM.Game.update = function( socket ){
	socket.broadcast({
		time: MM.Game.TIME++
	});
}

setInterval( MM.Game.update, 1000 * 3, socket );
