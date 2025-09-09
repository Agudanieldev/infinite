( function() {

	var app = {

		initHeader: function() {
			jQuery('.menu_btn').on('click', function() {
				jQuery('body').toggleClass('active_menu');
				
				if(!jQuery('body').hasClass('active_menu')){
					jQuery('.header-contact-info.mob_hidden').stop(true, true).delay(300).fadeIn();
				}else{
					jQuery('.header-contact-info.mob_hidden').stop(true, true).delay(300).fadeOut();
				}
			});

			jQuery("#nav").navTabDoubleTap();

		},
		initSlideshow: function() {
			jQuery('a.slideshow-next').on('click', function(e) {
				// jQuery('#slideshow .cycloneslider-slides').cycle('next');
				e.preventDefault();
				jQuery('#slideshow .aios-slider.aios-slider-template-default .splide .splide__arrow--next').trigger("click");
			});
			jQuery('a.slideshow-prev').on('click', function(e) {
				// jQuery('#slideshow .cycloneslider-slides').cycle('prev');
				e.preventDefault();
				jQuery('#slideshow .aios-slider.aios-slider-template-default .splide .splide__arrow--prev').trigger("click");
			});
		}, 
		initFeaturedProperties: function() {
			jQuery('.fp-details-list').slick({
				dots: false,
				arrows: false,
				autoplay: false,
				autoplaySpeed: 5000,
				draggable: false,
				asNavFor: '.fp-img-list',
				speed: 800,
				fade: true
			});
			jQuery('.fp-img-list').slick({
				dots: false,
				arrows: true,
				autoplay: false,
				prevArrow: '.fp-prev',
				nextArrow: '.fp-next',
				asNavFor: '.fp-details-list',
				speed: 800,
			});
		},
		initFeaturedPropertiesPage: function() {
			jQuery('.mobile .ip_prop_wrap a').click(function( e ) {
		           e.preventDefault();
		           if( jQuery(this).hasClass('clicked_once') ) {
		               var item_link = jQuery(this).attr('href');
		               window.location.href = item_link;
		           }
		           jQuery(this).addClass('clicked_once');
		     });
		},
		initTestimonials: function() {
			jQuery('.testi-text-list').slick({
				dots: false,
				arrows: true,
				autoplay: true,
				autoplaySpeed: 5000,
				draggable: false,
				// asNavFor: '.testi-img-list',
				speed: 800,
				fade: true,
				prevArrow: '.testi-prev',
				nextArrow: '.testi-next',
			});
			// jQuery('.testi-img-list').slick({
			// 	dots: false,
			// 	arrows: true,
			// 	autoplay: false,
			// 	prevArrow: '.testi-prev',
			// 	nextArrow: '.testi-next',
			// 	asNavFor: '.testi-text-list',
			// 	speed: 800,
			// });
		},
		initPropertyDetails: function() {
			jQuery('a.ip_prop_det_photo_link').aiosPopup({
				mainClass: 'ip_prop_det_carousel_wrapper aiosp-fade',
				items: {
					src: '#ip_prop_det_carousel',
					type: 'inline',
				},
				removalDelay: 300,
				callbacks: {
					open: function() {
						jQuery('.ip_prop_det_carousel_slick').slick({
							dots: false,
							arrows: true,
							speed: 500,
							autoplay: true,
							autoplaySpeed: 5000,
							nextArrow: '<button class="slick-next slick-arrow ai-font-arrow-g-n" aria-label="Next" type="button"></button>',
							prevArrow: '<button class="slick-prev slick-arrow ai-font-arrow-g-p" aria-label="Prev" type="button"></button>'
						});
					},
					close: function() {
						jQuery('.ip_prop_det_carousel_slick').slick('unslick');
					}
				}
			});

		}, 
		initMapResponsiveness: function() {
			var map = jQuery('.map-inner');
            var mapOrigWidth = 1600;
            var mapOrigHeight = 850;
            var container = jQuery('.map-outer');
            var containerWidth = container.width();
            var scale = containerWidth / mapOrigWidth;
            scale = scale > 1 ? scale : scale;

            map.css({
                transform: 'scale(' + scale + ')',
                transformOrigin: '0 0'
            });

            container.css({
                height: (mapOrigHeight * scale)
            });
		},
		initMapHover: function () {
            jQuery('.map-inner area').hover(function () {
            	jQuery('#' + jQuery(this).attr('class') + ' img').css('opacity',1);
                jQuery('#' + jQuery(this).attr('class')).addClass('elem-active');
                jQuery('.map-text div[data-map-area="'+jQuery(this).attr('class')+'"]').addClass('elem-active');
                jQuery('.map-side [data-map-area="'+jQuery(this).attr('class')+'"]').addClass('elem-active');
            }, function () {
            	jQuery('#' + jQuery(this).attr('class') + ' img').css('opacity',0);
                jQuery('#' + jQuery(this).attr('class')).removeClass('elem-active');
                jQuery('.map-text div[data-map-area="'+jQuery(this).attr('class')+'"]').removeClass('elem-active');
                jQuery('.map-side [data-map-area="'+jQuery(this).attr('class')+'"]').removeClass('elem-active');
            });

            jQuery('.map-text div').hover(function(){
            	jQuery('#' + jQuery(this).attr('data-map-area') + ' img').css('opacity',1);
            	jQuery('#' + jQuery(this).attr('data-map-area')).addClass('elem-active');
            	jQuery('.map-text div[data-map-area="'+jQuery(this).attr('data-map-area')+'"]').addClass('elem-active');
            	jQuery('.map-side [data-map-area="'+jQuery(this).data('map-area')+'"]').addClass('elem-active');
            }, function () {
            	jQuery('#' + jQuery(this).attr('data-map-area') + ' img').css('opacity',0);
            	jQuery('#' + jQuery(this).attr('data-map-area')).removeClass('elem-active');
            	jQuery('.map-text div[data-map-area="'+jQuery(this).attr('data-map-area')+'"]').removeClass('elem-active');
            	jQuery('.map-side [data-map-area="'+jQuery(this).data('map-area')+'"]').removeClass('elem-active');
            });

            jQuery('.map-side a').hover(function() {
            	jQuery('#' + jQuery(this).attr('data-map-area') + ' img').css('opacity',1);
            	jQuery('#' + jQuery(this).attr('data-map-area')).addClass('elem-active');
            	jQuery('.map-text div[data-map-area="'+jQuery(this).attr('data-map-area')+'"]').addClass('elem-active');
            }, function () {
            	jQuery('#' + jQuery(this).attr('data-map-area') + ' img').css('opacity',0);
            	jQuery('#' + jQuery(this).attr('data-map-area')).removeClass('elem-active');
            	jQuery('.map-text div[data-map-area="'+jQuery(this).attr('data-map-area')+'"]').removeClass('elem-active');
            });

        },
		initFeaturedCommunities: function() {
			/* Put featured communities code here */
		},
		initQuickSearch: function() {
			/* Put quick search code here */
		},
		initCustomFunction: function() {
			/* See the pattern? Create more functions like this if needed. */
		},

		sitePopup: function() {
			jQuery('#pum-1182').on('pumAfterClose', function() {
				setTimeout(function() {
					PUM.open(1182);
				}, 300000)
			});
		},
		aboutwatsonRemovetitle:function (){

			    if (location.href.indexOf('about-watson-realty-co') > -1 ) {

                    jQuery('<img src="http://www.quianawatson.com/wp-content/uploads/2020/12/logo.png" alt="About Logo" class="aboutlogo">').appendTo('.custom_title span');


            }


		},
		feedImgFix: function(){
			
			if (window.location.href.indexOf('/current-market-data/') > -1) {
				setTimeout(function(){
					jQuery('.field--featured-image img').each(function(){

						jQuery(this).attr('src','https://www.quianashonte.com/app/uploads/2024/11/lawrence-yun-instant-reaction-03-23-2020-1300w-867h_0.png');

					});
				},200);
				
			}
			
		},
		
		rssFeedOpenNewTab:function (){
			jQuery('.page-id-4663 .blog-item a').attr('target','_blank')
		},
		
	}

	
	jQuery(document).ready( function() {
		
		app.feedImgFix();
		app.initHeader();
		app.initSlideshow();
		app.initFeaturedProperties();
		app.initFeaturedPropertiesPage();
		app.initPropertyDetails();
		app.aboutwatsonRemovetitle();
		app.rssFeedOpenNewTab();

		/* Initialize featured communities */
		app.initFeaturedCommunities();
		
		/* Initialize testimonials */
		app.initTestimonials();
		
		/* Initialize quick search */
		app.initQuickSearch();
		app.initMapResponsiveness();
		app.initMapHover();
		app.sitePopup();
		
	});
	
	jQuery(window).on('load', function(){


	});

	jQuery(window).on('resize', function(){
		app.initMapResponsiveness();
	});


})();