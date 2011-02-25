var
	cluster = require('cluster'),
	http = require('http'),
	io = require('./Socket.IO-node'),
	MM = require('./mm/index'),
	server, socket;

// HTTP Server
MM.SERVER = http.createServer( MM.Server.create );

// Comet Server
MM.SOCKET = io.listen( MM.SERVER );
MM.SOCKET.on( 'connection', MM.Socket.onConnection );

// Cluste spawn
MM.CLUSTER = cluster( MM.SERVER )
	.use( cluster.logger('logs','debug') )
	.use( cluster.stats() )
	.use( cluster.pidfiles('pids') )
	.use( cluster.cli() )
	.use( cluster.debug() )
	.use( cluster.repl(8888) )
	.listen(8080);
