// MM.Socket.Client
var Client = module.exports = {
	onMessage: function( content, client ){
		client.broadcast({
			from: client.sessionId, message: content
		});
	},
	onDisconnect: function( client ){
		client.broadcast({
			announcement: client.sessionId + ' disconnected'
		});
	}
};
