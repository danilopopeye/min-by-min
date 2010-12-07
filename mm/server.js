// MM.Server
var Server = module.exports = {
	create: function(request, response) {
		response.writeHead( 405, { 'Content-Type': 'text/plain' });
		response.write('Nothing to see here, move along!', 'utf8');
		response.end();
	}
};
