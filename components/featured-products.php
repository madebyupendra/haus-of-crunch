<?php
/**
 * Featured Products Component
 * --------------------------
 * Usage:
 * get_template_part('components/featured-products');
 * 
 * Settings are pulled from WordPress Customizer
 */

// Get featured products settings from customizer
$featured_products_limit = get_theme_mod('hoc_featured_products_limit', 8);
$featured_products_title = get_theme_mod('hoc_featured_products_title', 'Featured Products');

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

// Allow override from args if provided
$featured_products_limit = $args['limit'] ?? $featured_products_limit;
$featured_products_title = $args['title'] ?? $featured_products_title;

// Query featured products
$query_args = array(
    'post_type'      => 'product',
    'posts_per_page' => absint($featured_products_limit),
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
);

// Add featured product visibility
$product_visibility_term_ids = wc_get_product_visibility_term_ids();
if (!empty($product_visibility_term_ids['featured'])) {
    $query_args['tax_query'] = array(
        array(
            'taxonomy' => 'product_visibility',
            'field'    => 'term_taxonomy_id',
            'terms'    => array($product_visibility_term_ids['featured']),
            'operator' => 'IN',
        ),
    );
}

$featured_products_query = new WP_Query($query_args);

// Only display if we have products
if (!$featured_products_query->have_posts()) {
    return;
}
?>

<div class="hoc-container">
    <div class="hoc-featured-products">
        <!-- Section Header -->
        <div class="hoc-featured-products__header">
            <h2 class="hoc-featured-products__title"><?php echo esc_html($featured_products_title); ?></h2>
            <div class="hoc-featured-products__navigation">
                <button 
                    class="hoc-featured-products__arrow hoc-featured-products__arrow--prev" 
                    aria-label="<?php esc_attr_e('Previous products', 'haus-of-crunch'); ?>"
                    type="button"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button 
                    class="hoc-featured-products__arrow hoc-featured-products__arrow--next" 
                    aria-label="<?php esc_attr_e('Next products', 'haus-of-crunch'); ?>"
                    type="button"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Product Grid/Carousel -->
        <div class="hoc-featured-products__wrapper">
            <ul class="hoc-product-grid hoc-featured-products__grid">
                <?php
                while ($featured_products_query->have_posts()) {
                    $featured_products_query->the_post();
                    global $product;
                    if (!$product || !$product->is_visible()) {
                        continue;
                    }
                    wc_get_template_part('content', 'product');
                }
                wp_reset_postdata();
                ?>
            </ul>
        </div>
    </div>
</div>

