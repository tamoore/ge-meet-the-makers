import $ from 'jquery';

$(function(){

	$('.maker-panel').on('click', function(e){		

		var state = $(this).data('state'),
			panels = $('.maker-panel'),
			panel = $(this);

		if (state == 'init') {
			panels.removeClass('maker-panel-excerpt');
			panel.addClass('maker-panel-excerpt');
			panel.data('state', 'excerpt');
		}

		if (state == 'excerpt') {
			panels.removeClass('maker-panel-excerpt');
			panels.data('state', 'init');
		}

	});

});