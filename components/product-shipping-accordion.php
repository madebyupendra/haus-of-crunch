<?php
/**
 * Product Shipping & Delivery Accordion Component
 * 
 * Displays shipping and delivery information in an accordion format
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

// Get shipping & delivery content from custom field
$shipping_delivery = get_post_meta($product->get_id(), '_shipping_delivery', true);

// Don't render if no content
if (empty($shipping_delivery)) {
    return;
}

// Apply content filters (same as WooCommerce does for description)
$shipping_delivery = apply_filters('the_content', $shipping_delivery);

$unique_id = 'hoc-product-shipping-accordion-' . $product->get_id();
$heading = __('Shipping & Delivery', 'haus-of-crunch');
?>

<div class="hoc-product-accordion" id="<?php echo esc_attr($unique_id); ?>">
    <div class="hoc-product-accordion__item">
        <button 
            class="hoc-product-accordion__button" 
            type="button"
            aria-expanded="false"
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
                <?php echo $shipping_delivery; // WPCS: XSS ok - already filtered through the_content ?>
            </div>
        </div>
    </div>
</div>

