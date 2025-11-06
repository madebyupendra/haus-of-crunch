/**
 * Main JS - Haus of Crunch Theme
 * Handles filter panel toggle and accessibility
 */
(function($){
	'use strict';
	
	$(document).ready(function(){
		// Filter Panel Toggle (Mobile)
		$('.hoc-filter-toggle').on('click', function(e){
			e.preventDefault();
			var $toggle = $(this);
			var $filterPanel = $('.hoc-filter-panel');
			var isExpanded = $toggle.attr('aria-expanded') === 'true';
			
			// Toggle filter panel
			$filterPanel.toggleClass('is-open');
			$toggle.attr('aria-expanded', !isExpanded);
			
			// Close on escape
			if (!isExpanded) {
				$(document).on('keydown.filterPanel', function(e){
					if (e.key === 'Escape' && $filterPanel.hasClass('is-open')) {
						$filterPanel.removeClass('is-open');
						$toggle.attr('aria-expanded', 'false').focus();
						$(document).off('keydown.filterPanel');
					}
				});
			} else {
				$(document).off('keydown.filterPanel');
			}
		});
		
		// Close filter panel when clicking outside (mobile only)
		if ($(window).width() <= 767) {
			$(document).on('click', function(e){
				if (!$(e.target).closest('.hoc-filter-panel, .hoc-filter-toggle').length && $('.hoc-filter-panel').hasClass('is-open')) {
					$('.hoc-filter-panel').removeClass('is-open');
					$('.hoc-filter-toggle').attr('aria-expanded', 'false');
				}
			});
		}
	});
})(jQuery);
  