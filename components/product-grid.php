<?php
/**
 * Product Grid Component
 *
 * Displays products in a responsive grid layout
 * Uses WooCommerce product loop
 *
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

// Output the product grid using the custom shop loop function
echo hoc_custom_shop_loop();

