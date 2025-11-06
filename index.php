<?php
/**
 * The main template file
 *
 * @package Haus_of_Crunch
 */

get_header();
?>
<div class="hoc-container">
  <h1 class="hoc-h1"><?php esc_html_e('Welcome to Haus of Crunch', 'haus-of-crunch'); ?></h1>

  <?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h2 class="hoc-h2">
          <a href="<?php echo esc_url(get_permalink()); ?>">
            <?php echo esc_html(get_the_title()); ?>
          </a>
        </h2>
        <div class="entry-summary"><?php the_excerpt(); ?></div>
      </article>
    <?php endwhile; ?>
  <?php else : ?>
    <p><?php esc_html_e('No posts found.', 'haus-of-crunch'); ?></p>
  <?php endif; ?>
</div>
<?php
get_footer();
