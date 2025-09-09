( function() {

	var saveMapWidth = 0;

	var app = {

  	customResultsIHF: function(){
		  	var disclaimer = jQuery('#ihf-board-disclaimers').prop('outerHTML');
			var ihf_powered = jQuery('.ihf-powered-by').prop('outerHTML');
			var html = '';
           if (jQuery('.ihf-listing-search-results .ihf-grid-result').length) {
         jQuery('.ihf-listing-search-results .ihf-grid-result').each(function(){
           price = jQuery(this).find('.ihf-grid-result-price .ihf-for-sale-price').text();
           image = jQuery(this).find('.ihf-grid-result-container .row .col-xs-12 .ihf-results-grid-photo').data('ihf-main-source').replace('url("','').replace('")','');
           address = jQuery(this).find('.col-xs-10 .ihf-grid-result-address').text().split(',');
           beds = jQuery(this).find('.ihf-grid-result-basic-info-container .ihf-grid-result-basic-info-item1').text();
           baths = jQuery(this).find('.ihf-grid-result-basic-info-container .ihf-grid-result-basic-info-item2').text();
           link = jQuery(this).find('.ihf-grid-result-container .row .col-xs-12 .ihf-grid-result-price a').attr('href');
           logo = jQuery(this).find('.ihf-grid-results-logo').attr('style');

           image = "\'"+image+"\'"; 

           html += '<a href="'+link+'" class="ip_prop">'+
                     '<canvas width="800" height="494" style="background-image: url('+image+')"></canvas>'+
                     '<div class="ip_prop_hover">'+
                       '<div style="'+logo+'" class="results-logo"></div>'+
                        '<div class="ip_prop_address1 ip_prop_address1_absolute">'+address[0]+'</div>'+
                       '<div class="ip_prop_address1 ip_prop_address1_placeholder ">'+address[0]+'</div>'+
                       '<div class="ip_prop_address2">'+address[1]+'</div>'+
                       '<div class="ip_prop_price">'+price+'</div>'+
                       '<div class="ip_prop_ammenities">'+beds+'<span>|</span>'+baths+'</div>'+
                     '</div>'+
                   '</a>';

               });

                   innerPaged = jQuery('.pagination').html();
                   jQuery('.pagination').remove();
                   paged = '<center><ul class="pagination">'+innerPaged+'</ul></center>';
                   jQuery('.results-page #inner-page-wrapper').empty();
                   jQuery('.results-page #inner-page-wrapper').html(html).append(paged).append('<div class="ihf-disclaimer">' + disclaimer + ihf_powered + '</div>');
           } else {
               html = 'No Results Found';
           }

    },

		// customDetailsPageIHF: function(){
		// 	price = jQuery('.ihf-for-sale-price').text();
		// 	address = jQuery('.ihf-address').text();
		// 	address = address.split(',');
		// 	image = jQuery('.item.active .ihf-center img.media-object').data('ihf-main-source');
		// 	beds = jQuery('.property-main-detail-item.ihf-bedrooms').text();
		// 	baths = jQuery('.property-main-detail-item.ihf-baths').text();
		// 	description = jQuery('.col-md-12.ihf-description').text();
		// 	listingAgent = jQuery('#ihf-agent-sellers-rep').html();
		// 	listingDisclaimer = jQuery('#ihf-board-detail-disclaimer').html();
		// 	listingUpdate = jQuery('#ihf-board-detail-updatetext').html();
		// 	slideHTML = '';
		// 	var parent = '';
		// 	var content = '';
		// 	var string = '';
		// 	var lists = '';
		// 	var listHTML = '';
		// 	var listExtHTML  = '';

		// 	jQuery('img.media-object').each(function(){
		// 		sliderImage = jQuery(this).data('ihf-main-source');
		// 		slideHTML += '<div class="ip_prop_det_carousel_photos">'+
		// 			'<canvas style="background-image: url('+sliderImage+');"></canvas>'+
		// 		'</div>';

		// 	})
		// 	jQuery('#ihf-detail-features-tab').find('.listing-info-item-title:contains(Interior:)').each(function(){
		// 		parent = jQuery(this).parent();
		// 		if (parent != '') {
		// 			content = parent.html();	
		// 			string = parent.text().replace(jQuery(this).html(), '');
		// 			lists = string.split(',');
		// 			listHTML= '';
		// 			for(i = 0; i < lists.length; i++){
		// 		    	listHTML += '<li><i class="icon_ip_prop_check"></i>'+lists[i]+'</li>';
		// 			}
		// 		}
				
				
				
		// 	});
		// 	jQuery('#ihf-detail-features-tab').find('.listing-info-item-title:contains(Exterior:)').each(function(){
		// 		parent = jQuery(this).parent();
		// 		if (parent != '') {
		// 			content = parent.html();
		// 			string = parent.text().replace(jQuery(this).html(), '');
		// 			listsExt = string.split(',');
		// 			listExtHTML= '';
		// 			for(i = 0; i < listsExt.length; i++){
		// 		 	   listExtHTML += '<li><i class="icon_ip_prop_check"></i>'+listsExt[i]+'</li>';
		// 			}
		// 		}
		// 	});

		// 	if (listHTML == '' && listExtHTML == '') {
		// 		listExtHTML = '<li>No Features</li>';
		// 	}
		// 	jQuery('.custom_title_wrap').css('display','none');

        //     var from = document.referrer;
        //     if(from == 'http://www.quianawatson.com/' || from == 'http://www.quianawatson.com'){
        //         from = 'http://www.quianawatson.com/listing-report/Featured-Properties/1007211';
		// 	}
		// 	else{
        //         from = document.referrer;
		// 	}

		// 	var response = '<div class="ip_prop_det_wrap">'+
		// 		'<div class="ip_prop_det_head">'+
		// 			'<div class="ip_prop_det_banner ip-banner">'+
		// 										'<canvas width="1600" height="575" style="background-image: url('+image+');"></canvas>'+
		// 										'<div class="hidden" id="ip_prop_det_carousel">'+
		// 											'<div class="ip_prop_det_carousel_slick">'+
		// 													slideHTML+
		// 											'</div>'+
		// 										'</div>'+
		// 								'</div>'+
		// 								'<div class="ip_prop_details container">'+
		// 									'<div class="ip_prop_det_price">'+price+'</div>'+
		// 									'<div class="ip_prop_det_address1">'+address[0]+'</div>'+
		// 									'<div class="ip_prop_det_address2">'+address[1]+'</div>'+
		// 									'<div class="ip_prop_det_ammenities">'+beds+'<span>|</span>'+baths+'</div>'+
		// 								'</div>'+
		// 								'<div class="section-clip">'+
		// 				'<div class="section-clip-left">'+
		// 					'<a href="'+from+'" class="ip_prop_det_link_back">Back To Properties</a>'+
		// 				'</div>'+
		// 				'<div class="section-clip-right">'+
		// 					'<a href="#ip_prop_det_carousel" class="ip_prop_det_photo_link">'+
		// 						'<img src="http://quianawatsoncom.rs4.aios-staging.com/wp-content/themes/quianawatson.com/images/properties/icon-more-images.png" alt="More Images">'+
		// 					'</a>'+
		// 				'</div>'+
		// 			'</div>'+
		// 		'</div>'+

		// 		'<div class="ip_prop_det_section_1">'+
		// 			'<div class="container">'+
		// 				'<div class="row">'+
		// 					'<div class="ip_prop_det_left col-md-5 col-md-offset-1">'+
		// 						'<ul class="ip_prop_det_btn_list">'+
		// 							'<li><a href="#" class="btn-a btn-schedule">Schedule Showing »</a></li>'+
		// 							'<li><a href="#" class="btn-a btn-request">Request Info »</a></li>'+
		// 							'<li><a href="#" class="btn-a btn-save-to-favorites">Save To Favorites »</a></li>'+
		// 						'</ul>'+
		// 					'</div>'+
		// 					'<div class="ip_prop_det_right col-md-6">'+
		// 						'<div class="ip_prop_det_info">'
		// 							+description+
		// 							'<div id="listingAgentCont">'
		// 								+listingAgent+
		// 							'</div>'+
		// 							'<div id="listingAgentCont">'
		// 								+listingDisclaimer+
		// 							'</div>'+
		// 							'<div id="listingAgentCont">'
		// 								+listingUpdate+
		// 							'</div>'+
		// 						'</div>'+
		// 					'</div>'+
		// 				'</div>	'+
		// 			'</div>'+
		// 		'</div>'+

		// 		'<div class="ip_prop_det_section_2">'+
		// 			'<div class="container">'+
		// 				'<div class="ip_prop_det_tab_row">'+
		// 					'<ul class="ip_prop_det_tabs hidden-xs">'+
		// 						'<li class="active"><a href="#ip_prop_features" data-toggle="tab">Features</a></li>'+
		// 						'<li><a href="#ip_prop_map" id="tab-map" data-toggle="tab">Map</a></li>'+
		// 						'<li><a href="#ip_prop_schools" id="tab-schools" data-toggle="tab">Schools</a></li>'+
		// 						'<li><a href="#ip_prop_walkscore" id="tab-walkscore" data-toggle="tab">Walk Score</a></li>'+
		// 						'<li><a href="#ip_prop_mortgage" id="tab-mortgage" data-toggle="tab">Mortgage Calculator</a></li>'+
		// 					'</ul>'+
		// 					'<ul class="ip_prop_det_tabs visible-xs">'+
		// 						'<li class="active"><a href="#ip_prop_features" data-toggle="tab">Features</a></li>'+
		// 						'<li><a href="#ip_prop_map" data-toggle="tab">Map</a></li>'+
		// 						'<li class="dropdown">'+
		// 							'<a href="#" data-toggle="dropdown">More <span class="caret"></span></a>'+
		// 							'<ul class="dropdown-menu pull-right">'+
		// 								'<li><a href="#ip_prop_schools" data-toggle="tab">Schools</a></li>'+
		// 								'<li><a href="#ip_prop_walkscore" data-toggle="tab">Walk Score</a></li>'+
		// 								'<li><a href="#ip_prop_mortgage" data-toggle="tab">Mortgage Calculator</a></li>'+
		// 							'</ul>'+
		// 						'</li>'+
		// 					'</ul>'+
		// 				'</div>'+
		// 				'<div class="ip_prop_det_tab_content tab-content">'+
		// 					'<div class="tab-pane active" id="ip_prop_features">'+
		// 						'<ul class="ip_prop_features_list">'+
		// 							listHTML+
		// 							listExtHTML+
		// 						'</ul>'+
		// 					'</div>'+
		// 					'<div class="tab-pane" id="ip_prop_map"></div>'+
		// 					'<div class="tab-pane" id="ip_prop_schools"></div>'+
		// 					'<div class="tab-pane" id="ip_prop_walkscore"></div>'+
		// 					'<div class="tab-pane" id="ip_prop_mortgage"></div>'+
		// 				'</div>'+
		// 			'</div>'+
		// 		'</div>'+

		// 	'</div>';
		// 	jQuery('.details-page #inner-page-wrapper').children().hide();
		// 	jQuery('.details-page #inner-page-wrapper').append(response);

		// 	jQuery('.btn-schedule').click(function(){
		// 		jQuery('.schedule-showing-btn').click();
		// 		return false;
		// 	});
		// 	jQuery('.btn-request').click(function(){
		// 		jQuery('.info-req-btn').click();
		// 		return false;
		// 	});
		// 	jQuery('.btn-save-to-favorites').click(function(){
		// 		jQuery('.save-listing-btn').click();
		// 		return false;
		// 	});
		// 	// Append Map
		// 	jQuery('#ihf-map-tab').trigger('click');
		// 	jQuery('#ihf-map-canvas').appendTo('#ip_prop_map');
		// 	jQuery(document).one('click','#tab-map',function(){
		// 		jQuery('#ihf-map-tab').trigger('click');
		// 	});

		// 	// Append School
		// 	setTimeout(function(){
		// 		if(jQuery('#ihf-detail-extrainfotabs li.dropdown ul li a#ihf-schools-tab-sm').length > 0) {
		// 			jQuery('#ihf-detail-extrainfotabs li.dropdown').addClass('open');
		// 			jQuery('#ihf-detail-extrainfotabs li.dropdown ul li a#ihf-schools-tab-sm').click();
		// 		} else {
		// 			jQuery('#ihf-schools-tab').click();
		// 		}
		// 	}, 2500);

		// 	setTimeout(function(){
		// 		if(jQuery('#ihf-detail-extrainfotabs li.dropdown ul li a#ihf-schools-tab-sm').length > 0) {
		// 			var  mapWidth = 1100;

		// 			if( window.innerWidth <= 1439 ) {
		// 				mapWidth = 900;
		// 			}

		// 			if( window.innerWidth <= 992 ) {
		// 				mapWidth = 768;
		// 			}

		// 			if( window.innerWidth <= 768 ) {
		// 				mapWidth = window.innerWidth - 50;
		// 			}

		// 			if( window.innerWidth <= 667 ) {
		// 				mapWidth = window.innerWidth - 30;
		// 			}

		// 			var appendMapInterval = setInterval(appendMap, 1000);

		// 	 		function appendMap() {
		// 	 			if( jQuery('#ihf-schools-tab-content #ihf-great-schools-widget').html().length > 0 ) {
		// 	 				jQuery('#ihf-schools-tab-content').appendTo('#ip_prop_schools');
		// 	 				var link = jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src');
		// 	 				jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('id', 'greatschool-map');
		// 					var new_link = link.replace('width=-30', 'width=' + mapWidth);
		// 					saveMapWidth = mapWidth;
		// 					jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src', new_link);
		// 	 				clearInterval(appendMapInterval);
		// 	 			}
		// 	 		}
		// 		} else {
		// 	 		var changeMapInterval = setInterval(changeMap, 1000);

		// 			function changeMap() {
		// 				if( jQuery('#ihf-schools-tab-content #ihf-great-schools-widget').html().length > 0 ) {
		// 					jQuery('#ihf-schools-tab-content').appendTo('#ip_prop_schools');
		// 					var link = jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src');
		// 					jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('id', 'greatschool-map');
		// 					var new_link = link.replace('width=-30', 'width=' + mapWidth);
		// 					saveMapWidth = mapWidth;
		// 					jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src', new_link);
		// 					clearInterval(changeMapInterval);
		// 				}
		// 			}
		// 		}
		// 	}, 3500);

		// 	jQuery(document).one('click','#tab-schools',function(){

		// 	});

		// 	//Append walkscore
		// 	jQuery('#ihf-walkscore-tab').trigger('click');
		// 	jQuery('#ihf-walkscore-content').appendTo('#ip_prop_walkscore');
		// 	 jQuery(document).one('click','#tab-walkscore',function(){
		// 		 jQuery('#ihf-walkscore-tab').trigger('click');
		// 	 });

		// 	// Append Mortgage
		// 	jQuery('#ihf-mortgage-calculator-tab-content').appendTo('#ip_prop_mortgage');
		// 	 jQuery(document).one('click','#tab-mortgage',function(){
		// 		 jQuery('#map-mortgage').trigger('click');
		// 	 });
		// },

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

		// fix missing forms
		initIHFFixes: function() {
			if (!jQuery('.ihf-listing-detail').length && jQuery('.ihf-modal-container').length) {
				return false;
			}
			jQuery('body').append('<div id="ihf-main-container" class="ihf-modal-container ihf-color-scheme-gray"></div>');
			jQuery('#ihf-detail-modals .modal').detach().appendTo('body > .ihf-modal-container');
			// ihfJquery(".modal").on("shown.bs.modal",function(){jQuery(".modal-backdrop").detach().insertBefore('.ihf-modal-container')});
			jQuery(".modal").on("shown.bs.modal",function(){jQuery(".modal-backdrop").detach().insertBefore('.ihf-modal-container')})
		},
	}


	jQuery(document).ready( function() {

		if (location.pathname == '/homes-for-sale-results/' || location.pathname == '/properties/' || location.pathname == '/homes-for-sale-featured/') {
			jQuery(document.body).addClass('results-page');
			app.customResultsIHF();
		}
		
		if (location.pathname == '/homes-for-sale-search/' ) {
			setTimeout(function(){
				jQuery('.ip-banner canvas').attr('style','background-image: url(https://www.quianashonte.com/app/uploads/2021/07/search-banner.jpg);');
			},200);		
		}

		app.initIHFFixes();

	});
	jQuery(window).on('load', function(){
		var $current_url = jQuery( location ).attr('href');
		if($current_url.indexOf('/homes-for-sale-details/') != -1 ){
		 jQuery(document.body).addClass('details-page');
            jQuery('#ihf-map-tab').trigger('click');
            setTimeout(function(){
                // app.customDetailsPageIHF();
                app.initPropertyDetails();
            }, 100);


	 }
	});

	jQuery(window).on('resize', function(){
		setTimeout(function(){
			var  mapWidth = 1100;

			if( window.innerWidth <= 1439 ) {
				mapWidth = 900;
			}

			if( window.innerWidth <= 992 ) {
				mapWidth = 768;
			}

			if( window.innerWidth <= 768 ) {
				mapWidth = window.innerWidth - 50;
			}

			if( window.innerWidth <= 667 ) {
				mapWidth = window.innerWidth - 30;
			}

			if(jQuery('body.home').length != 0){
				var link = jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src');
				new_link = link.replace('width=' + saveMapWidth, 'width=' + mapWidth);
				saveMapWidth = mapWidth;

				jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src', new_link);
			}
			
			
		}, 500 );
	});

	jQuery(window).on('orientationchange', function(event) {
		setTimeout(function(){
			var  mapWidth = 1100;

			if( window.innerWidth <= 1439 ) {
				mapWidth = 900;
			}

			if( window.innerWidth <= 992 ) {
				mapWidth = 768;
			}

			if( window.innerWidth <= 768 ) {
				mapWidth = window.innerWidth - 50;
			}

			if( window.innerWidth <= 667 ) {
				mapWidth = window.innerWidth - 30;
			}
			
			var link = jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src');
			new_link = link.replace('width=' + saveMapWidth, 'width=' + mapWidth);
			saveMapWidth = mapWidth;

			jQuery('#ip_prop_schools #ihf-schools-tab-content #ihf-great-schools-widget iframe').attr('src', new_link);
		}, 500 );
	});
})();