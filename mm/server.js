// MM.Server
var Server = module.exports = {
	create: function(req, res) {
		var MM = module.parent.exports, message;

		message = Server.getMessage( req.url );

		message && MM.SOCKET.broadcast({
			message: 'ADMIN: ' + message
		});

		res.writeHead( 405, { 'Content-Type': 'text/plain' });
		res.write('Nothing to see here, move along!\n', 'utf8');
		res.end();
	},
	getMessage: function( u ){
		var url = require('url').parse( u ),
			query = require('querystring').parse( url.query || '' );

		return query.message || false;
	}
};
