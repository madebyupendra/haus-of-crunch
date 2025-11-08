/**
 * Featured Products Carousel
 * Handles carousel navigation for featured products on desktop and tablet
 */
(function($){
    'use strict';
    
    $(document).ready(function(){
        var $carousel = $('.hoc-featured-products__grid');
        var $prevBtn = $('.hoc-featured-products__arrow--prev');
        var $nextBtn = $('.hoc-featured-products__arrow--next');
        
        if ($carousel.length === 0) {
            return;
        }
        
        var currentIndex = 0;
        var itemsToShow = 0;
        var totalItems = $carousel.find('.hoc-product-card').length;
        var gap = 8; // 8px gap between items
        
        /**
         * Check if carousel should be active
         */
        function shouldActivateCarousel() {
            return $(window).width() > 640;
        }
        
        /**
         * Calculate how many items to show based on screen size
         */
        function calculateItemsToShow() {
            var windowWidth = $(window).width();
            
            if (windowWidth >= 1024) {
                // Desktop: 4 columns
                itemsToShow = 4;
            } else if (windowWidth >= 641) {
                // Tablet: 3 columns
                itemsToShow = 3;
            } else {
                // Mobile: no carousel
                itemsToShow = totalItems;
            }
        }
        
        /**
         * Get the width of a single item including gap
         */
        function getItemWidth() {
            if ($carousel.find('.hoc-product-card').length === 0) {
                return 0;
            }
            var $firstItem = $carousel.find('.hoc-product-card').first();
            if ($firstItem.length === 0) {
                return 0;
            }
            var itemWidth = $firstItem.outerWidth(true);
            return itemWidth;
        }
        
        /**
         * Update carousel position
         */
        function updateCarousel() {
            if (!shouldActivateCarousel()) {
                // Mobile: reset carousel
                $carousel.css('transform', 'translateX(0)');
                $prevBtn.prop('disabled', true);
                $nextBtn.prop('disabled', true);
                return;
            }
            
            calculateItemsToShow();
            
            if (itemsToShow >= totalItems) {
                // All items visible, no need for carousel
                $carousel.css('transform', 'translateX(0)');
                $prevBtn.prop('disabled', true);
                $nextBtn.prop('disabled', true);
                return;
            }
            
            var maxIndex = Math.max(0, totalItems - itemsToShow);
            currentIndex = Math.min(currentIndex, maxIndex);
            currentIndex = Math.max(0, currentIndex);
            
            var itemWidth = getItemWidth();
            if (itemWidth === 0) {
                // Items not yet rendered, try again later
                setTimeout(updateCarousel, 100);
                return;
            }
            
            var translateX = -(currentIndex * itemWidth);
            $carousel.css('transform', 'translateX(' + translateX + 'px)');
            
            // Update button states
            $prevBtn.prop('disabled', currentIndex === 0);
            $nextBtn.prop('disabled', currentIndex >= maxIndex);
        }
        
        /**
         * Initialize carousel
         */
        function initCarousel() {
            if (!shouldActivateCarousel()) {
                $prevBtn.prop('disabled', true);
                $nextBtn.prop('disabled', true);
                return;
            }
            
            // Reset index if needed
            currentIndex = 0;
            updateCarousel();
        }
        
        /**
         * Navigate to previous set of items
         */
        function goToPrev() {
            if (!shouldActivateCarousel()) {
                return;
            }
            
            calculateItemsToShow();
            if (currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - itemsToShow);
                updateCarousel();
            }
        }
        
        /**
         * Navigate to next set of items
         */
        function goToNext() {
            if (!shouldActivateCarousel()) {
                return;
            }
            
            calculateItemsToShow();
            var maxIndex = Math.max(0, totalItems - itemsToShow);
            if (currentIndex < maxIndex) {
                currentIndex = Math.min(maxIndex, currentIndex + itemsToShow);
                updateCarousel();
            }
        }
        
        // Event handlers
        $prevBtn.on('click', function(e) {
            e.preventDefault();
            goToPrev();
        });
        
        $nextBtn.on('click', function(e) {
            e.preventDefault();
            goToNext();
        });
        
        // Recalculate on window resize
        var resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                currentIndex = 0; // Reset to beginning on resize
                initCarousel();
            }, 250);
        });
        
        // Initialize after a short delay to ensure DOM is ready
        setTimeout(function() {
            initCarousel();
        }, 100);
        
        // Recalculate after images load (in case layout shifts)
        $carousel.find('img').on('load', function() {
            if (shouldActivateCarousel()) {
                updateCarousel();
            }
        });
    });
})(jQuery);

