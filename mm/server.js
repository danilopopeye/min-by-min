// MM.Server
var qs = require('querystring'),

Server = module.exports = {
	create: function(request, response) {
		var MM = module.parent.exports;
console.log( arguments );
		MM.SOCKET.broadcast(
			Server.parseURL( request.url )
		);

		response.writeHead( 405, { 'Content-Type': 'text/plain' });
		response.write('Nothing to see here, move along!', 'utf8');
		response.end();
	},
	parseURL: function( url ){
		var split = url.split('?');

		return {
			href: split[0],
			params: qs.parse( split[1] || '' )
		};
	}
};
