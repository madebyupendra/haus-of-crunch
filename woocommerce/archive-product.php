<?php
/**
 * The Template for displaying product archives (Shop page)
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

get_header('shop');
?>

<div class="hoc-shop-page">
  <div class="hoc-container">
    <!-- Mobile Filter Toggle Button -->
    <button class="hoc-filter-toggle" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle filters', 'haus-of-crunch'); ?>">
      <span><?php esc_html_e('Filters', 'haus-of-crunch'); ?></span>
    </button>

    <div class="hoc-shop-layout">
      
      <!-- Filter Panel Sidebar -->
      <aside class="hoc-shop-sidebar">
        <?php echo hoc_get_component('filter-panel'); ?>
      </aside>

      <!-- Main Product Grid -->
      <main class="hoc-shop-main">
        <?php
        // Show WooCommerce notices
        wc_print_notices();
        
        // Output product grid directly (no section wrapper needed here)
        echo hoc_get_component('product-grid');
        ?>
      </main>

    </div>
  </div>
</div>

<?php get_footer('shop'); ?>
