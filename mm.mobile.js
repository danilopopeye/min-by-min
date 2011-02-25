(function(){
	var MM = window.MM;

	MM.announcement = function( message ){
		$('li:first,ul').eq(0).prepend(
			'<li data-role="list-divider">'+
				message + '<span class="ui-li-count">'+ MM.Bar.time +'</span>' +
			'</li>'
		).listview('refresh');
	};

	MM.message = function( message ){
		$('li:first,ul').eq(0).prepend(
			'<li>'+
				message + '<span class="ui-li-count">'+ MM.Bar.time +'</span>' +
			'</li>'
		).listview('refresh');
	};

	$('div[data-role=page]').live('pageshow', function(){
		MM.Bar.step = ( $('#barraMin').parent().innerWidth() - 2 ) / 60;
	});
})();
