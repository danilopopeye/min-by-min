// MM.Socket
var Socket = module.exports = {
	Client: require('./client'),
	onConnection: function( client ){
		// be polite
		client.send({ buffer: 'welcome' });

		// tell everyone about it
		client.broadcast({
			announcement: client.sessionId + ' connected'
		});

		// client sends a message
		client.on( 'message', Socket.Client.onMessage );

		// client disconnect
		client.on( 'disconnect', Socket.Client.onDisconnect );
	}
};
