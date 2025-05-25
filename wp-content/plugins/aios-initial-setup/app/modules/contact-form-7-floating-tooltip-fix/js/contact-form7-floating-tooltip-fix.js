(function (jQuery) {
	jQuery(document).ready( function() {
		jQuery(document).on('hover', '.use-floating-validation-tip .wpcf7-not-valid-tip', function(e) {
			jQuery(e.currentTarget).fadeOut(100);
		});
	});
})(jQuery);