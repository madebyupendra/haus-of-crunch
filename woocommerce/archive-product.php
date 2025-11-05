<?php
/**
 * The Template for displaying product archives (Shop page)
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

get_header('shop');
?>

<?php
// Hero / Intro Section for the Shop page (optional)
get_template_part('components/section', null, [
  'background' => 'secondary',
  'content'    => '
    <div class="text-center">
      <h1 class="hoc-heading-lg">Shop All Supplements</h1>
      <p class="hoc-text-md">Fuel your performance — curated by Haus of Crunch</p>
    </div>
  ',
]);
?>

<?php
// Main Shop Layout
get_template_part('components/section', null, [
  'background' => 'default',
  'content'    => '
    <div class="hoc-container">
      <div class="woocommerce-shop">
        ' . woocommerce_content() . '
      </div>
    </div>
  ',
]);
?>

<?php
get_footer('shop');
