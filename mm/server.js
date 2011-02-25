// MM.Server
var Server = module.exports = {
	create: function(req, res) {
		var MM = module.parent.exports,
			query = Server.getQuery( req.url );

		console.log( query, typeof query.restart );

		if( typeof query.restart !== undefined ){
			MM.Game.init();
		}

		res.writeHead( 405, { 'Content-Type': 'text/plain' });
		res.write(
			'Nothing to see here, move along!\n' + JSON.stringify( MM.CLUSTER ),
			'utf8'
		);
		res.end();
	},
	getQuery: function( u ){
		var url = require('url').parse( u ),
			query = require('querystring').parse( url.query || '' );

		return query;
	}
};
