<?php
/**
 * Product Accordion Component
 * 
 * Displays product description in an accordion format
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

// Get args from query vars or direct $args
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

// Get product description
$description = $product->get_description();

// Don't render if no description
if (empty($description)) {
    return;
}

// Apply content filters (same as WooCommerce does)
$description = apply_filters('the_content', $description);

$unique_id = 'hoc-product-accordion-' . $product->get_id();
$heading = apply_filters('woocommerce_product_description_heading', __('Description', 'woocommerce'));
?>

<div class="hoc-product-accordion" id="<?php echo esc_attr($unique_id); ?>">
    <div class="hoc-product-accordion__item is-open">
        <button 
            class="hoc-product-accordion__button" 
            type="button"
            aria-expanded="true"
            aria-controls="<?php echo esc_attr($unique_id); ?>-content"
        >
            <span><?php echo esc_html($heading); ?></span>
            <svg 
                class="hoc-product-accordion__icon" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
            >
                <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div 
            class="hoc-product-accordion__content" 
            id="<?php echo esc_attr($unique_id); ?>-content"
            role="region"
        >
            <div class="hoc-product-accordion__content-inner">
                <?php echo $description; // WPCS: XSS ok - already filtered through the_content ?>
            </div>
        </div>
    </div>
</div>

