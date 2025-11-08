<?php
/**
 * Hero Component
 * --------------
 * Usage:
 * get_template_part('components/hero');
 * 
 * Settings are pulled from WordPress Customizer
 */

// Get hero settings from customizer
$hero_image_id = get_theme_mod('hoc_hero_image', '');
$hero_title = get_theme_mod('hoc_hero_title', '');
$hero_link = get_theme_mod('hoc_hero_link', '');

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

// Allow override from args if provided
$hero_image_id = $args['image_id'] ?? $hero_image_id;
$hero_title = $args['title'] ?? $hero_title;
$hero_link = $args['link'] ?? $hero_link;

// Only display if we have an image or title
if (empty($hero_image_id) && empty($hero_title)) {
    return;
}

// Get image URL
$hero_image_url = '';
if ($hero_image_id) {
    $hero_image_url = wp_get_attachment_image_url($hero_image_id, 'full');
}

// Get image alt text
$hero_image_alt = '';
if ($hero_image_id) {
    $hero_image_alt = get_post_meta($hero_image_id, '_wp_attachment_image_alt', true);
    if (empty($hero_image_alt)) {
        $hero_image_alt = $hero_title ? esc_attr($hero_title) : __('Hero image', 'haus-of-crunch');
    }
}
?>

<div class="hoc-container hoc-hero-container">
    <div class="hoc-hero">
        <?php if ($hero_image_url) : ?>
            <div class="hoc-hero__image-wrapper">
                <img 
                    src="<?php echo esc_url($hero_image_url); ?>" 
                    alt="<?php echo esc_attr($hero_image_alt); ?>"
                    class="hoc-hero__image"
                />
                <?php if ($hero_title) : ?>
                    <div class="hoc-hero__content">
                        <?php if ($hero_link) : ?>
                            <a href="<?php echo esc_url($hero_link); ?>" class="hoc-hero__title-link">
                                <h2 class="hoc-hero__title"><?php echo esc_html($hero_title); ?></h2>
                            </a>
                        <?php else : ?>
                            <h2 class="hoc-hero__title"><?php echo esc_html($hero_title); ?></h2>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php else : ?>
            <?php if ($hero_title) : ?>
                <div class="hoc-hero__content hoc-hero__content--no-image">
                    <?php if ($hero_link) : ?>
                        <a href="<?php echo esc_url($hero_link); ?>" class="hoc-hero__title-link">
                            <h2 class="hoc-hero__title"><?php echo esc_html($hero_title); ?></h2>
                        </a>
                    <?php else : ?>
                        <h2 class="hoc-hero__title"><?php echo esc_html($hero_title); ?></h2>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>

