/**
 * Product Gallery Carousel - Haus of Crunch Theme
 * Handles swipe/touch navigation for product gallery on mobile/tablet
 */
(function($) {
    'use strict';

    function initProductGallery() {
        $('.hoc-product-gallery').each(function() {
            var $gallery = $(this);
            var $track = $gallery.find('.hoc-product-gallery__track');
            var $slides = $gallery.find('.hoc-product-gallery__slides');
            var $dots = $gallery.find('.hoc-product-gallery__dot');
            var $slideElements = $gallery.find('.hoc-product-gallery__slide');
            var currentIndex = 0;
            var isDragging = false;
            var startX = 0;
            var scrollLeft = 0;
            var isMobile = window.innerWidth < 1024;

            // Only initialize carousel on mobile/tablet
            if (!isMobile || $slideElements.length <= 1) {
                return;
            }

            // Update active dot based on scroll position
            function updateActiveDot() {
                var scrollPosition = $slides[0].scrollLeft;
                var slideWidth = $slides[0].offsetWidth;
                currentIndex = Math.round(scrollPosition / slideWidth);

                // Update dots
                $dots.removeClass('is-active').attr('aria-current', 'false');
                $dots.eq(currentIndex).addClass('is-active').attr('aria-current', 'true');

                // Update slide ARIA attributes
                $slideElements.attr('aria-hidden', 'true');
                $slideElements.eq(currentIndex).attr('aria-hidden', 'false');
            }

            // Scroll to specific slide
            function goToSlide(index) {
                if (index < 0 || index >= $slideElements.length) {
                    return;
                }

                var slideWidth = $slides[0].offsetWidth;
                $slides[0].scrollTo({
                    left: index * slideWidth,
                    behavior: 'smooth'
                });

                currentIndex = index;
                updateActiveDot();
            }

            // Dot navigation
            $dots.on('click', function(e) {
                e.preventDefault();
                var index = $(this).data('slide-index');
                goToSlide(index);
            });

            // Touch/swipe handlers
            $slides.on('mousedown touchstart', function(e) {
                isDragging = true;
                var event = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
                startX = event.pageX - $slides.offset().left;
                scrollLeft = $slides[0].scrollLeft;
                $slides.addClass('is-dragging');
            });

            $slides.on('mousemove touchmove', function(e) {
                if (!isDragging) return;
                e.preventDefault();
                var event = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
                var x = event.pageX - $slides.offset().left;
                var walk = (x - startX) * 2; // Scroll speed
                $slides[0].scrollLeft = scrollLeft - walk;
            });

            $slides.on('mouseup touchend mouseleave', function() {
                if (isDragging) {
                    isDragging = false;
                    $slides.removeClass('is-dragging');
                    updateActiveDot();
                }
            });

            // Update dots on scroll (for programmatic scrolling)
            $slides.on('scroll', function() {
                if (!isDragging) {
                    updateActiveDot();
                }
            });

            // Keyboard navigation
            $slides.attr('tabindex', '0').on('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToSlide(currentIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToSlide(currentIndex + 1);
                }
            });

            // Initialize ARIA attributes
            $slideElements.attr('aria-hidden', 'true');
            $slideElements.eq(0).attr('aria-hidden', 'false');

            // Handle window resize
            $(window).on('resize', function() {
                var newIsMobile = window.innerWidth < 1024;
                if (newIsMobile !== isMobile) {
                    isMobile = newIsMobile;
                    if (!isMobile) {
                        // Reset on desktop
                        $slides[0].scrollLeft = 0;
                        updateActiveDot();
                    }
                }
            });
        });
    }

    // Initialize on document ready
    $(document).ready(function() {
        initProductGallery();
    });

    // Re-initialize after AJAX content loads (e.g., variation changes)
    $(document).on('woocommerce_variation_has_changed', function() {
        initProductGallery();
    });

})(jQuery);

