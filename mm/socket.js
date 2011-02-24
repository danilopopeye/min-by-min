// MM.Socket
var Socket = module.exports = {
	Client: require('./client'),
	onConnection: function( client ){
		var Game = module.parent.exports.Game;

		// be polite
		client.send({ announcement: {
			id: client.sessionId,
			score: Game.Match
		} });

		// client sends a message
		client.on( 'message', function( content ){
			// make sure the client object is passsed
			Socket.Client.onMessage.call( this, content, client );
		});

		// client disconnect
		client.on( 'disconnect', function(){
			// make sure the client object is passsed
			Socket.Client.onDisconnect.call( this, client );
		});
	}
};
