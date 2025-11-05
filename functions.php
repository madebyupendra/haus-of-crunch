<?php
/**
 * Haus of Crunch - functions.php
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue styles & scripts
 */
function hoc_enqueue_assets() {
    $theme_dir = get_template_directory_uri();

    // CSS - ensure tokens first, then typography, then base, then theme style
    wp_enqueue_style( 'hoc-tokens', $theme_dir . '/assets/css/tokens.css', array(), '0.1' );
    wp_enqueue_style( 'hoc-typography', $theme_dir . '/assets/css/typography.css', array('hoc-tokens'), '0.1' );
    wp_enqueue_style( 'hoc-base', $theme_dir . '/assets/css/base.css', array('hoc-typography'), '0.1' );
    wp_enqueue_style( 'hoc-button', $theme_dir . '/assets/css/components/button.css', array(), null );
    wp_enqueue_style( 'hoc-container', $theme_dir . '/assets/css/components/container.css', array(), null );
    wp_enqueue_style( 'hoc-section', $theme_dir . '/assets/css/components/section.css', array(), null );
    wp_enqueue_style( 'hoc-shop', get_template_directory_uri() . '/assets/css/components/shop.css', [], null );
    wp_enqueue_style( 'hoc-product-card', get_template_directory_uri() . '/assets/css/components/product-card.css', [], null );

    // Main theme stylesheet (optional - you can leave blank or add future overrides)
    wp_enqueue_style( 'hoc-style', get_stylesheet_uri(), array('hoc-base'), '0.1' );

    // JS
    wp_enqueue_script( 'hoc-main', $theme_dir . '/assets/js/main.js', array('jquery'), '0.1', true );
}
add_action( 'wp_enqueue_scripts', 'hoc_enqueue_assets' );

/**
 * Theme supports
 */
function hoc_theme_setup() {
    // Basic supports
    add_theme_support( 'title-tag' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'post-thumbnails' );

    // Declare WooCommerce support (keeps core behavior intact)
    add_theme_support( 'woocommerce' );

    // HTML5 support
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
}
add_action( 'after_setup_theme', 'hoc_theme_setup' );

/**
 * Load component template helper (optional simple wrapper)
 * Usage: get_template_part( 'components/container' );
 */
