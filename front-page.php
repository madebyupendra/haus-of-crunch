<?php
/**
 * The front page template
 *
 * @package Haus_of_Crunch
 */

get_header();
?>

<?php
// Display Hero Section
get_template_part('components/hero');

// Display Category Highlights Section
get_template_part('components/category-highlights');

// Display Featured Products Section
get_template_part('components/featured-products');
?>

<?php
get_footer();

