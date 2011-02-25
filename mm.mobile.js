(function(){
	var MM = window.MM;

	MM.announcement = function( message ){
		$('ul').append(
			'<li data-role="list-divider">'+
				message + '<span class="ui-li-count">'+ MM.Bar.time +'</span>' +
			'</li>'
		).listview('refresh');
	};

	MM.message = function( message ){
		$('ul').append(
			'<li>'+
				message + '<span class="ui-li-count">'+ MM.Bar.time +'</span>' +
			'</li>'
		).listview('refresh');
	};

	MM.reset = function(){
		this.Bar.update(0);
		$('li:gt(0)').remove();
		$('#placar-principal span').text(0);
	}

	$('div[data-role=page]').live('pageshow', function(){
		MM.Bar.step = ( $('#barraMin').parent().innerWidth() - 30 ) / 60;
	});
})();
