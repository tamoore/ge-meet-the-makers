import $ from 'jquery';

$(function(){

	$('.marker-data a').on('mouseover', function(e){

		// Get values
		var marker = $(this);
		var previewSrc = marker.data('preview');
		var previewTitle = marker.data('title');
		var previewIndustry = marker.data('industry');

		// Get display objects
		var previewImage = $('#imagePreview');
		var previewImageLeft =  marker.offset().left - ( previewImage.width() / 2 );
		var previewImageTop =  marker.offset().top - ( previewImage.height() / 2 );

		previewImage.css({'left':  previewImageLeft, 'top': previewImageTop}).show();

		console.log(marker.offset().left)

	}).on('mouseout', function(e){
		$('.preview-object').hide();
	});

});