module.exports = {
	create: function(request, response) {
		response.writeHead( 200, { 'Content-Type': 'text/plain' });
		response.write('Socket.IO', 'utf8');
		response.end();
	}
};
