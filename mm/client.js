// MM.Socket.Client
var Client = module.exports = {
	onMessage: function( content, client ){
		client.broadcast({
			from: client.sessionId, message: content
		});
	},
	onDisconnect: function( client ){
		Client.client.broadcast({
			announcement: client.id + ' disconnected'
		});
	}
};
