/**
 * Product Card Lazy Loading with Shimmer Effect
 * Handles image loading and removes shimmer when images are loaded
 */

(function() {
    'use strict';

    /**
     * Initialize lazy loading for product card images
     */
    function initProductCardLazyLoading() {
        const productCards = document.querySelectorAll('.hoc-product-card');
        
        if (productCards.length === 0) {
            return;
        }

        // First, handle images that are already loaded or immediately visible
        productCards.forEach(card => {
            const imageWrapper = card.querySelector('.hoc-product-card__image-wrapper');
            if (imageWrapper) {
                const images = imageWrapper.querySelectorAll('img');
                const shimmer = imageWrapper.querySelector('.hoc-product-card__shimmer');

                images.forEach(img => {
                    // Check if image is already loaded
                    if (img.complete && img.naturalHeight !== 0) {
                        handleImageLoad(img, shimmer);
                    } else if (img.src && img.src !== window.location.href) {
                        // Image has a source, wait for it to load
                        img.addEventListener('load', () => handleImageLoad(img, shimmer), { once: true });
                        img.addEventListener('error', () => handleImageError(img, shimmer), { once: true });
                        
                        // Force load if it hasn't started (for images without loading="lazy")
                        if (!img.loading || img.loading === 'eager') {
                            // Image should load immediately
                            if (img.complete) {
                                handleImageLoad(img, shimmer);
                            }
                        }
                    }
                });
            }
        });

        // Create Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imageWrapper = entry.target;
                    const images = imageWrapper.querySelectorAll('img');
                    const shimmer = imageWrapper.querySelector('.hoc-product-card__shimmer');

                    images.forEach(img => {
                        // If image is already loaded, mark it immediately
                        if (img.complete && img.naturalHeight !== 0) {
                            handleImageLoad(img, shimmer);
                        } else {
                            // Wait for image to load
                            img.addEventListener('load', () => handleImageLoad(img, shimmer), { once: true });
                            img.addEventListener('error', () => handleImageError(img, shimmer), { once: true });
                        }
                    });

                    observer.unobserve(imageWrapper);
                }
            });
        }, {
            rootMargin: '50px' // Start loading images 50px before they enter viewport
        });

        // Observe all product card image wrappers
        productCards.forEach(card => {
            const imageWrapper = card.querySelector('.hoc-product-card__image-wrapper');
            if (imageWrapper) {
                // Check if images are already visible (for featured products above fold)
                const rect = imageWrapper.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    // Images are already visible, handle them immediately
                    const images = imageWrapper.querySelectorAll('img');
                    const shimmer = imageWrapper.querySelector('.hoc-product-card__shimmer');
                    images.forEach(img => {
                        if (img.complete && img.naturalHeight !== 0) {
                            handleImageLoad(img, shimmer);
                        } else {
                            img.addEventListener('load', () => handleImageLoad(img, shimmer), { once: true });
                            img.addEventListener('error', () => handleImageError(img, shimmer), { once: true });
                        }
                    });
                } else {
                    // Images not yet visible, use intersection observer
                    imageObserver.observe(imageWrapper);
                }
            }
        });
    }

    /**
     * Handle successful image load
     */
    function handleImageLoad(img, shimmer) {
        img.classList.add('loaded');
        
        // Hide shimmer after a short delay for smooth transition
        if (shimmer) {
            setTimeout(() => {
                shimmer.style.opacity = '0';
                setTimeout(() => {
                    shimmer.style.display = 'none';
                }, 300);
            }, 100);
        }
    }

    /**
     * Handle image load error
     */
    function handleImageError(img, shimmer) {
        img.classList.add('loaded'); // Still show it, but mark as loaded
        
        // Hide shimmer even on error
        if (shimmer) {
            shimmer.style.opacity = '0';
            setTimeout(() => {
                shimmer.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Handle images that might have loaded before script runs
     */
    function handleAlreadyLoadedImages() {
        const productCards = document.querySelectorAll('.hoc-product-card');
        productCards.forEach(card => {
            const imageWrapper = card.querySelector('.hoc-product-card__image-wrapper');
            if (imageWrapper) {
                const images = imageWrapper.querySelectorAll('img');
                const shimmer = imageWrapper.querySelector('.hoc-product-card__shimmer');
                
                images.forEach(img => {
                    // If image is already loaded and complete
                    if (img.complete && img.naturalHeight > 0 && !img.classList.contains('loaded')) {
                        handleImageLoad(img, shimmer);
                    }
                });
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initProductCardLazyLoading();
            // Also check for already loaded images after a short delay
            setTimeout(handleAlreadyLoadedImages, 100);
        });
    } else {
        initProductCardLazyLoading();
        // Check for already loaded images after a short delay
        setTimeout(handleAlreadyLoadedImages, 100);
    }

    // Re-initialize after AJAX loads (for filtered results, pagination, etc.)
    document.addEventListener('woocommerce_updated', function() {
        initProductCardLazyLoading();
        setTimeout(handleAlreadyLoadedImages, 100);
    });

    // Also handle window load event for images that load late
    window.addEventListener('load', function() {
        handleAlreadyLoadedImages();
    });
})();

