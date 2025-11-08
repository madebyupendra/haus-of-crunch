/**
 * Product Accordion - Haus of Crunch Theme
 * Handles accordion toggle functionality for product descriptions
 */
(function($){
	'use strict';
	
	$(document).ready(function(){
		// Product Accordion Toggle
		$('.hoc-product-accordion__button').on('click', function(e){
			e.preventDefault();
			var $button = $(this);
			var $item = $button.closest('.hoc-product-accordion__item');
			var $content = $item.find('.hoc-product-accordion__content');
			var isExpanded = $button.attr('aria-expanded') === 'true';
			
			// Toggle open state
			$item.toggleClass('is-open');
			$button.attr('aria-expanded', !isExpanded);
			
			// Set max-height for smooth animation
			if (!isExpanded) {
				// Opening: set to scrollHeight
				$content.css('max-height', $content[0].scrollHeight + 'px');
			} else {
				// Closing: set to 0
				$content.css('max-height', '0');
			}
		});
		
		// Handle window resize to recalculate heights
		$(window).on('resize', function(){
			$('.hoc-product-accordion__item.is-open').each(function(){
				var $content = $(this).find('.hoc-product-accordion__content');
				$content.css('max-height', $content[0].scrollHeight + 'px');
			});
		});
		
		// Initialize open accordions with proper max-height
		$('.hoc-product-accordion__item.is-open').each(function(){
			var $content = $(this).find('.hoc-product-accordion__content');
			$content.css('max-height', $content[0].scrollHeight + 'px');
		});
	});
})(jQuery);

