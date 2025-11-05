<?php
get_header();
?>
<div class="hoc-container">
  <h1 class="hoc-h1">Welcome to Haus of Crunch</h1>

  <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
      <h2 class="hoc-h2"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      <div class="entry-summary"><?php the_excerpt(); ?></div>
    </article>
  <?php endwhile; else: ?>
    <p>No posts found.</p>
  <?php endif; ?>
</div>
<?php
get_footer();
