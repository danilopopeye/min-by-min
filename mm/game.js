var

PLAYERS = [
	'Jaden','Tristan','Caden','Caleb','Connor','Ethan','Rylan','Landon','Noah',
	'Tyler','Joshua','Jayden','Michael','Ryan','Sean','Aidan','Samuel','Hayden',
	'Micah','Dylan','Killian','James','Elijah','Joseph','Logan'
],

ACTIONS = [
	'fez falta em', 'trombou com', 'faz belo passe para', 'erra o gol e xinga',
	'desarma', 'se desentende com'
],

rand = function(n){
	return parseInt( Math.random() * n, 10 );
},

Game = module.exports = {
	Match: {
		time: 0, home: 0, away: 0,
	},
	reset: function(){
		var M = this.Match;
		M.time = M.home = M.away = 0;
		Game.broadcast({ refresh: true });
	},
	init: function(){
		clearInterval( this.timeout );

		this.reset();

		Game.broadcast({ time: 0, play: {
			text: 'Começa a partida'
		} });

		this.timeout = setInterval(
			Game.tick, 1000, Game
		);
	},
	tick: function( Game ){
		if( Game.Match.time === 10 ){
			clearInterval( Game.timeout );

			return Game.broadcast({
				time: Game.Match.time,
				play: {
					text: 'Fim de jogo'
				}
			});
		}

		var obj = {
			time: Game.Match.time++
		};

		if( rand(5) < 2 ){
			obj.play = Game.buildPlay();
		}

		Game.broadcast( obj );
	},
	buildPlay: function(){
		var M = this.Match, RAND = rand( M.time * 7 ), team;

		// someone make a goal
		if( RAND % 7 === 0 && RAND % 2 === 0 ){
			var team = [ 'home', 'away' ][ RAND % 2 ];
			return {
				goal: {
					team: team,
					score: ++M[ team ]
				},
				text: PLAYERS[ rand( 25 ) ] + ' chuta e marca! GOOOOOLLLLLLL'
			};
		} else {
			return {
				text: [
					PLAYERS[ rand( PLAYERS.length ) ],
					ACTIONS[ rand( ACTIONS.length ) ],
					PLAYERS[ rand( PLAYERS.length ) ],
				].join(' ')
			};
		}
	},
	broadcast: function( obj ){
		module.parent.exports.SOCKET.broadcast( obj );
		console.log( obj );
	}
};
