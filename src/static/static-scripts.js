// Mobile
$(function(){

    $('#menuTrigger').on('click', function(e){      

        $('.menu').addClass('menu-slide').on('click', function(){
            $(this).removeClass('menu-slide');
        });

    });

});

// Circle
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

// Makers
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