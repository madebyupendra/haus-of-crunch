<?php
/**
 * Template part for displaying products in the loop
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

global $product;

// Ensure visibility.
if (empty($product) || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('hoc-product-card'); ?>>

  <div class="hoc-product-card__inner">

    <!-- Product Image -->
    <div class="hoc-product-card__image-wrapper">
      <a href="<?php the_permalink(); ?>" class="hoc-product-card__image-link">
        <?php
        /**
         * Hook: woocommerce_before_shop_loop_item_title.
         *
         * @hooked woocommerce_show_product_loop_sale_flash - 10
         * @hooked woocommerce_template_loop_product_thumbnail - 10
         */
        do_action('woocommerce_before_shop_loop_item_title');
        ?>
      </a>
    </div>

    <!-- Product Content -->
    <div class="hoc-product-card__content">

      <h2 class="hoc-product-card__title">
        <a href="<?php the_permalink(); ?>">
          <?php the_title(); ?>
        </a>
      </h2>

      <div class="hoc-product-card__price">
        <?php
        /**
         * Hook: woocommerce_after_shop_loop_item_title.
         *
         * @hooked woocommerce_template_loop_rating - 5
         * @hooked woocommerce_template_loop_price - 10
         */
        do_action('woocommerce_after_shop_loop_item_title');
        ?>
      </div>

      <div class="hoc-product-card__actions">
        <?php
        /**
         * Hook: woocommerce_after_shop_loop_item.
         *
         * @hooked woocommerce_template_loop_add_to_cart - 10
         */
        do_action('woocommerce_after_shop_loop_item');
        ?>
      </div>

    </div>

  </div>

</li>
