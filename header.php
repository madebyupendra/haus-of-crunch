<?php
/**
 * Main header
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e('Skip to content', 'haus-of-crunch'); ?></a>
<div class="site">
  <header class="site-header">
    <div class="hoc-container site-header__inner">
      <div class="site-branding">
        <?php if ( function_exists( 'the_custom_logo' ) ) {
            the_custom_logo();
        } ?>
        <a class="site-title" href="<?php echo esc_url( home_url('/') ); ?>"><?php bloginfo('name'); ?></a>
      </div>

      <nav class="hoc-main-nav" aria-label="<?php esc_attr_e('Main Navigation', 'haus-of-crunch'); ?>">
        <?php
          wp_nav_menu( array(
            'theme_location' => 'primary',
            'container' => '',
            'menu_class' => 'hoc-menu',
            'fallback_cb' => false,
            'depth' => 2,
          ) );
        ?>
      </nav>
    </div>
  </header>

  <main id="main-content" class="site-main" role="main">