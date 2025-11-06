<?php
/**
 * The template for displaying all pages
 *
 * @package Haus_of_Crunch
 */

get_header();

if ( have_posts() ) :
  while ( have_posts() ) : the_post();
?>
  <div class="hoc-container">
    <h1 class="hoc-h1"><?php echo esc_html(get_the_title()); ?></h1>
    <div class="page-content">
      <?php the_content(); ?>
    </div>
  </div>
<?php
  endwhile;
endif;

get_footer();
