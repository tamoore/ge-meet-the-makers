import $ from 'jquery';

$(function(){

	$('.marker-data a').on('mouseover', function(e){

		$('.timeline-instructions').addClass('hidden');

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
		var circleWrap = $('#timelineCircleWrapper');
		var circleLeft = circleWrap.offset().left;
		var circleTop = circleWrap.offset().top;

		// Get marker positions
		var previewImageLeft =  marker.offset().left - circleLeft - ( previewImage.width() / 2 ) + (marker.width() /2);
		var previewImageTop =  marker.offset().top - circleTop -  ( previewImage.height() / 2 ) + (marker.width() /2);

		$('img', previewImage).attr('src', previewSrc);
		previewImage.css({'left':  previewImageLeft, 'top': previewImageTop}).addClass('preview-display');

		previewType.html(previewDataType);
		previewHeading.html(previewTitle);
		previewIcon
			.removeClass()
			.addClass('icon-industry-' + previewIndustry);


		previewBlurb.addClass('preview-display');

	}).on('mouseout', function(e){
		$('.preview-object').removeClass('preview-display');
		$('.timeline-instructions').removeClass('hidden');
	});

});