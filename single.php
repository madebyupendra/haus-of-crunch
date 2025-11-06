<?php
/**
 * The template for displaying all single posts
 *
 * @package Haus_of_Crunch
 */

get_header();

if ( have_posts() ) :
  while ( have_posts() ) : the_post();
?>
  <div class="hoc-container">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <h1 class="hoc-h1"><?php echo esc_html(get_the_title()); ?></h1>
      <div class="single-content">
        <?php the_content(); ?>
      </div>
    </article>
  </div>
<?php
  endwhile;
endif;

get_footer();
