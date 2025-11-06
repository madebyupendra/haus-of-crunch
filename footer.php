</main> <!-- .site-main -->

<footer class="site-footer">
  <div class="hoc-container">
    <?php
    // Footer menu
    if (has_nav_menu('footer')) {
        wp_nav_menu(array(
            'theme_location' => 'footer',
            'container' => 'nav',
            'container_class' => 'footer-menu',
            'menu_class' => 'footer-menu__list',
            'depth' => 1,
            'fallback_cb' => false,
        ));
    }
    ?>
    <p class="site-footer__copyright">
      &copy; <?php echo esc_html(date('Y')); ?> 
      <a href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>. 
      <?php esc_html_e('All rights reserved.', 'haus-of-crunch'); ?>
    </p>
  </div>
</footer>
</div> <!-- .site -->

<?php wp_footer(); ?>
</body>
</html>
