<?php
/**
 * Product Card Component
 *
 * Displays a single product in grid context
 * Layout: Image, Price & Title (side-by-side)
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

global $product;

// Enhanced error handling
if (empty($product) || !is_a($product, 'WC_Product') || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('hoc-product-card'); ?>>

  <a href="<?php the_permalink(); ?>" class="hoc-product-card__link">

    <div class="hoc-product-card__image-wrapper">
      <div class="hoc-product-card__shimmer"></div>
      <?php
      /**
       * Default WooCommerce product image
       */
      do_action('woocommerce_before_shop_loop_item_title');
      ?>
    </div>

    <div class="hoc-product-card__content">
      <div class="hoc-product-card__price">
        <?php do_action('woocommerce_after_shop_loop_item_title'); ?>
      </div>

      <h2 class="hoc-product-card__title"><?php echo esc_html(get_the_title()); ?></h2>
    </div>

  </a>

</li>
