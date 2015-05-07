import $ from 'jquery';

$(function(){

	$('#menuTrigger').on('click', function(e){		

		$('.menu').addClass('menu-slide').on('click', function(){
			$(this).removeClass('menu-slide');
		});

	});

});