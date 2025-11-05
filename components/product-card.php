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

if (empty($product) || !$product->is_visible()) {
  return;
}

// Get brand attribute if it exists
$brand = wc_get_product_terms($product->get_id(), 'pa_brand', ['fields' => 'names']);
$brand_name = !empty($brand) ? esc_html($brand[0]) : '';
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
        <span class="hoc-product-card__brand"><?php echo $brand_name; ?></span>
      <?php endif; ?>

      <h2 class="hoc-product-card__title"><?php the_title(); ?></h2>

      <div class="hoc-product-card__price">
        <?php do_action('woocommerce_after_shop_loop_item_title'); ?>
      </div>
    </div>

  </a>

</li>
