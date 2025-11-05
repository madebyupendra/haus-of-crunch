<?php
/**
 * The Template for displaying all single products
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

get_header('shop');
?>

<main class="hoc-single-product">
  <?php
  /**
   * Hook: woocommerce_before_main_content.
   *
   * @hooked woocommerce_output_content_wrapper - 10 (removed for our layout)
   * @hooked woocommerce_breadcrumb - 20
   */
  do_action('woocommerce_before_main_content');
  ?>

  <section class="hoc-section hoc-single-product__section">
    <div class="hoc-container">
      <?php
      while (have_posts()) :
        the_post();

        wc_get_template_part('content', 'single-product');

      endwhile; // end of the loop.
      ?>
    </div>
  </section>

  <?php
  /**
   * Hook: woocommerce_after_main_content.
   *
   * @hooked woocommerce_output_content_wrapper_end - 10 (removed for our layout)
   */
  do_action('woocommerce_after_main_content');
  ?>
</main>

<?php
get_footer('shop');
