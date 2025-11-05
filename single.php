<?php
get_header();
if ( have_posts() ) : while ( have_posts() ) : the_post();
?>
  <div class="hoc-container">
    <h1 class="hoc-h1"><?php the_title(); ?></h1>
    <div class="single-content"><?php the_content(); ?></div>
  </div>
<?php
endwhile; endif;
get_footer();
