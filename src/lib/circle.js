import $ from 'jquery';

$(function(){

	$('.marker-data a').on('mouseover', function(e){

		// Get values
		var marker = $(this);
		var previewSrc = marker.data('preview');
		var previewDataType = marker.data('type');
		var previewTitle = marker.data('title');
		var previewIndustry = marker.data('industry');

		// Get display objects
		var previewImage = $('#imagePreview');
		var previewHeading = $('#previewHeading');
		var previewType = $('#previewType');
		var previewIcon = $('#previewIcon');
		var previewBlurb = $('#previewBlurb');

		// Get circle dimensions
		var circle = $('#timelineList');

		// Get marker positions
		var previewImageLeft =  marker.offset().left - ( previewImage.width() / 2 );
		var previewImageTop =  marker.offset().top - ( previewImage.height() / 2 );

		previewImage
			.attr('src', previewSrc)
			.css({'left':  previewImageLeft, 'top': previewImageTop}).addClass('preview-display');

		previewType.html(previewDataType);
		previewHeading.html(previewTitle);
		previewIcon
			.removeClass()
			.addClass('icon-industry-' + previewIndustry);


		previewBlurb.addClass('preview-display');

	}).on('mouseout', function(e){
		$('.preview-object').removeClass('preview-display');
	});

});