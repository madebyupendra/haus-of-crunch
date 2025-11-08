<?php
/**
 * Product Gallery Component
 * 
 * Displays product images in a horizontal row on desktop
 * and as a swipeable carousel on mobile/tablet
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

// Get product from args or global
global $product;
$product = $args['product'] ?? $product;

// Fallback: if no product, try to get from post
if (!$product && is_product()) {
    $product = wc_get_product(get_the_ID());
}

if (!$product || !($product instanceof WC_Product)) {
    return;
}

// Get all product images
// Start with main product image
$main_image_id = $product->get_image_id();
$image_ids = [];

// Add main product image first (if it exists)
if ($main_image_id) {
    $image_ids[] = intval($main_image_id);
}

// Get gallery images
$gallery_image_ids = $product->get_gallery_image_ids();

// Add gallery images, excluding the main image to avoid duplicates
if (!empty($gallery_image_ids)) {
    foreach ($gallery_image_ids as $gallery_image_id) {
        $gallery_image_id = intval($gallery_image_id);
        // Only add if it's not the same as the main image
        if ($gallery_image_id !== $main_image_id && $gallery_image_id > 0) {
            $image_ids[] = $gallery_image_id;
        }
    }
}

// Ensure all IDs are integers and remove any duplicates
$image_ids = array_values(array_unique(array_filter($image_ids, 'is_numeric')));

if (empty($image_ids)) {
    // Fallback: placeholder image
    $image_ids = [0]; // Will use placeholder in wp_get_attachment_image
}

$unique_id = 'hoc-product-gallery-' . $product->get_id();
?>

<div class="hoc-product-gallery" id="<?php echo esc_attr($unique_id); ?>">
    <div class="hoc-product-gallery__wrapper">
        <div class="hoc-product-gallery__track" role="region" aria-label="<?php echo esc_attr__('Product gallery', 'haus-of-crunch'); ?>">
            <div class="hoc-product-gallery__slides">
                <?php foreach ($image_ids as $index => $image_id) : ?>
                    <div class="hoc-product-gallery__slide" data-slide-index="<?php echo esc_attr($index); ?>">
                        <div class="hoc-product-gallery__image-wrapper">
                            <?php
                            if ($image_id > 0) {
                                echo wp_get_attachment_image(
                                    $image_id,
                                    'woocommerce_single',
                                    false,
                                    [
                                        'class' => 'hoc-product-gallery__image',
                                        'alt' => $product->get_name() . ' - ' . ($index + 1),
                                        'loading' => $index === 0 ? 'eager' : 'lazy',
                                    ]
                                );
                            } else {
                                // Placeholder image
                                echo wc_placeholder_img('woocommerce_single', ['class' => 'hoc-product-gallery__image']);
                            }
                            ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <?php if (count($image_ids) > 1) : ?>
            <!-- Navigation dots (for carousel mode) -->
            <div class="hoc-product-gallery__dots" aria-label="<?php echo esc_attr__('Gallery navigation', 'haus-of-crunch'); ?>">
                <?php foreach ($image_ids as $index => $image_id) : ?>
                    <button 
                        class="hoc-product-gallery__dot<?php echo $index === 0 ? ' is-active' : ''; ?>" 
                        data-slide-index="<?php echo esc_attr($index); ?>"
                        aria-label="<?php echo esc_attr(sprintf(__('Go to slide %d', 'haus-of-crunch'), $index + 1)); ?>"
                        aria-current="<?php echo $index === 0 ? 'true' : 'false'; ?>"
                    >
                        <span class="screen-reader-text"><?php echo esc_html(sprintf(__('Slide %d', 'haus-of-crunch'), $index + 1)); ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

