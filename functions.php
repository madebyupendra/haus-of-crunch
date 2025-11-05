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

    // CSS
    wp_enqueue_style( 'hoc-tokens', $theme_dir . '/assets/css/tokens.css', [], '0.1' );
    wp_enqueue_style( 'hoc-typography', $theme_dir . '/assets/css/typography.css', ['hoc-tokens'], '0.1' );
    wp_enqueue_style( 'hoc-base', $theme_dir . '/assets/css/base.css', ['hoc-typography'], '0.1' );

    // Components
    wp_enqueue_style( 'hoc-button', $theme_dir . '/assets/css/components/button.css', [], null );
    wp_enqueue_style( 'hoc-container', $theme_dir . '/assets/css/components/container.css', [], null );
    wp_enqueue_style( 'hoc-section', $theme_dir . '/assets/css/components/section.css', [], null );
    wp_enqueue_style( 'hoc-shop', $theme_dir . '/assets/css/components/shop.css', [], null );
    wp_enqueue_style( 'hoc-product-card', $theme_dir . '/assets/css/components/product-card.css', [], null );
    wp_enqueue_style( 'hoc-single-product', $theme_dir . '/assets/css/components/single-product.css', [], null );

    // Main stylesheet
    wp_enqueue_style( 'hoc-style', get_stylesheet_uri(), ['hoc-base'], '0.1' );

    // JS
    wp_enqueue_script( 'hoc-main', $theme_dir . '/assets/js/main.js', ['jquery'], '0.1', true );
}
add_action( 'wp_enqueue_scripts', 'hoc_enqueue_assets' );

/**
 * Theme supports
 */
function hoc_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'custom-logo' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'woocommerce' );
    add_theme_support( 'html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption'] );
}
add_action( 'after_setup_theme', 'hoc_theme_setup' );

/**
 * Helper: Load component template
 */
function hoc_component($component_name, $args = []) {
    if (!empty($args)) {
        extract($args);
    }
    get_template_part('components/' . $component_name);
}
