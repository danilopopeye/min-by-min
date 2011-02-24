(function(){
	var d = new Date();
	window.MM = {
		game: {
			id: d.getDate() + d.getMonth() + d.getFullYear()
		},
		socket: new io.Socket(null, { port: 8080, rememberTransport: false }),
		init: function(){
			this.socket.connect();

			this.socket.on('message', this.onMessage );

			this.Bar.init();
		},

		announcement: function( message ){
			$('ul').append(
				'<li>'+
					'<p>'+ MM.Bar.time + ': ' + message +'</p>'+
				'</li>'
			);
		},
		message: function( message ){
			$('ul').append(
				'<li>'+ MM.Bar.time + ': ' + message + '</li>'
			);
		},

		onMessage: function( raw ){
			console && console.log( 'message', arguments );

			MM.Bar.update( raw.time );

			if( raw.play ){
				if( raw.play.goal ){
					MM.goal( raw.play.goal );
					MM.announcement( raw.play.text )
				} else {
					MM.message( raw.play.text );
				}
			}

			raw.announcement && MM.score( raw.announcement.score );
		},

		goal: function( action ){
			$('#placar-' + action.team ).text(
				action.score
			);
		},

		score: function( Match ){
			$.each(Match, function( item, value ){
				if( item === 'time' ){
					MM.Bar.update( value );
				} else {
					MM.goal({
						team: item,
						score: value
					});
				}
			});
		},

		Bar: {
			time: 0,
			element: $('#barraMin'),
			init: function(){
				this.width = $('#barra-minuto').innerWidth() - 50 - 50;
				this.step = parseInt( this.width / 60 );
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
