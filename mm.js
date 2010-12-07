(function(){
	window.MM = {
		socket: new io.Socket(null, { port: 8080, rememberTransport: false }),
		init: function(){
			this.socket.connect();

			this.socket.on('connect', this.onConnection);

			this.socket.on('message', this.onMessage );
		},

		announcement: function( raw ){
			$('ul').append(
				'<li>'+
					'<p>'+ raw.announcement +'</p>'+
				'</li>'
			);
		},
		message: function( raw ){
			$('ul').append(
				'<li>'+ ( raw.from + ': ' || '' ) + raw.message + '</li>'
			);
		},
		
		// socket events
		onConnection: function(){
			MM.socket.send( +new Date() );
		},
		onMessage: function(raw){
			console && console.log( 'message', raw );

			raw.announcement && MM.announcement( raw );

			raw.message && MM.message( raw );
		}
	};

	// Run, Forest... RUN!
	MM.init();
})();
