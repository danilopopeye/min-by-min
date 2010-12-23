// MM.Server
var Server = module.exports = {
	create: function(request, response) {
		var MM = module.parent.exports;

		MM.SOCKET.broadcast( Server.parseURL(
			require('url').parse( request.url )
		) );

		response.writeHead( 405, { 'Content-Type': 'text/plain' });
		response.write('Nothing to see here, move along!\n', 'utf8');
		response.end();
	},
	parseURL: function( url ){
		return {
			href: url.pathname,
			query: require('querystring').parse( url.query || '' )
		};
	}
};
