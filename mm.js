(function(){
	var d = d = new Date();
	window.MM = {
		game: {
			id: d.getDate() + d.getMonth() + d.getFullYear()
		},
		socket: new io.Socket(null, { port: 8080, rememberTransport: false }),
		init: function(){
			this.socket.connect();

			this.socket.on('connect', this.onConnection);

			this.socket.on('message', this.onMessage );

			this.Bar.init();
		},

		announcement: function( raw ){
			var annon = raw.announcement;

			$('ul').append(
				'<li>'+
					'<p>'+ ( annon.message || annon ) +'</p>'+
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
			MM.socket.send({
				game: MM.game.id
			});

			return;

			setTimeout(function(){
				MM.socket.send({
					realm: MM.realmName,
					message: 'mensagem pro realm'
				});
			}, 1000);
		},
		onMessage: function(raw){
			console && console.log( 'message', arguments );

			raw.announcement && MM.announcement( raw );

			raw.message && MM.message( raw );

			raw.time && MM.Bar.update( raw.time );
		},
		
		Bar: {
			time: 0,
			element: $('#barraMin'),
			init: function(){
				this.width = $('#barra-minuto').innerWidth() - 50 - 50;
				this.step = parseInt( this.width / 50 );
				this.update( this.time );
			},
			update: function( time ){
				this.element.animate({
					width: ( this.time = time ) * this.step || 1
				}, 'slow');
			}
		}
	};

	// Run, Forest... RUN!
	MM.init();
})();
