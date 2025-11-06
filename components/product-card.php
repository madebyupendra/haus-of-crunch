<?php
/**
 * Product Card Component
 *
 * Displays a single product in grid context
 * Layout: Image, Brand, Title, Price
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

global $product;

// Enhanced error handling
if (empty($product) || !is_a($product, 'WC_Product') || !$product->is_visible()) {
    return;
}

// Get brand taxonomy if it exists
$brand_terms = get_the_terms($product->get_id(), 'product_brand');
$brand_name = (!empty($brand_terms) && !is_wp_error($brand_terms)) ? esc_html($brand_terms[0]->name) : '';
?>

<li <?php wc_product_class('hoc-product-card'); ?>>

  <a href="<?php the_permalink(); ?>" class="hoc-product-card__link">

    <div class="hoc-product-card__image-wrapper">
      <?php
      /**
       * Default WooCommerce product image
       */
      do_action('woocommerce_before_shop_loop_item_title');
      ?>
    </div>

    <div class="hoc-product-card__content">
      <?php if ($brand_name) : ?>
        <span class="hoc-product-card__brand"><?php echo esc_html($brand_name); ?></span>
      <?php endif; ?>

      <h2 class="hoc-product-card__title"><?php echo esc_html(get_the_title()); ?></h2>

      <div class="hoc-product-card__price">
        <?php do_action('woocommerce_after_shop_loop_item_title'); ?>
      </div>
    </div>

  </a>

</li>
