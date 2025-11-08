<?php
/**
 * Category Highlights Component
 * -----------------------------
 * Usage:
 * get_template_part('components/category-highlights');
 * 
 * Settings are pulled from WordPress Customizer
 */

// Get category highlights settings from customizer
$column1_category_id = get_theme_mod('hoc_category_highlights_column1_category', '');
$column1_title = get_theme_mod('hoc_category_highlights_column1_title', '');
$column2_category_id = get_theme_mod('hoc_category_highlights_column2_category', '');
$column2_title = get_theme_mod('hoc_category_highlights_column2_title', '');

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

// Allow override from args if provided
$column1_category_id = $args['column1_category_id'] ?? $column1_category_id;
$column1_title = $args['column1_title'] ?? $column1_title;
$column2_category_id = $args['column2_category_id'] ?? $column2_category_id;
$column2_title = $args['column2_title'] ?? $column2_title;

// Only display if at least one column has content
if (empty($column1_category_id) && empty($column2_category_id)) {
    return;
}

/**
 * Helper function to get category data
 */
function hoc_get_category_highlight_data($category_id) {
    if (empty($category_id)) {
        return null;
    }
    
    $category = get_term($category_id, 'product_cat');
    if (!$category || is_wp_error($category)) {
        return null;
    }
    
    // Get category image
    $image_id = get_term_meta($category_id, 'thumbnail_id', true);
    $image_url = '';
    $image_alt = '';
    
    if ($image_id) {
        $image_url = wp_get_attachment_image_url($image_id, 'full');
        $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true);
        if (empty($image_alt)) {
            $image_alt = $category->name;
        }
    }
    
    // Get category link
    $category_link = get_term_link($category);
    if (is_wp_error($category_link)) {
        $category_link = '';
    }
    
    return array(
        'id' => $category_id,
        'name' => $category->name,
        'slug' => $category->slug,
        'link' => $category_link,
        'image_url' => $image_url,
        'image_alt' => $image_alt,
    );
}

// Get category data for both columns
$column1_data = hoc_get_category_highlight_data($column1_category_id);
$column2_data = hoc_get_category_highlight_data($column2_category_id);
?>

<div class="hoc-container hoc-category-highlights-container">
    <div class="hoc-category-highlights">
        <?php if ($column1_data) : ?>
            <div class="hoc-category-highlights__column">
                <a href="<?php echo esc_url($column1_data['link']); ?>" class="hoc-category-highlights__link">
                    <div class="hoc-category-highlights__image-wrapper">
                        <?php if ($column1_data['image_url']) : ?>
                            <img 
                                src="<?php echo esc_url($column1_data['image_url']); ?>" 
                                alt="<?php echo esc_attr($column1_data['image_alt']); ?>"
                                class="hoc-category-highlights__image"
                            />
                        <?php else : ?>
                            <div class="hoc-category-highlights__placeholder">
                                <?php echo esc_html($column1_data['name']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if ($column1_title) : ?>
                            <div class="hoc-category-highlights__content">
                                <h2 class="hoc-category-highlights__title"><?php echo esc_html($column1_title); ?></h2>
                            </div>
                        <?php endif; ?>
                    </div>
                </a>
            </div>
        <?php endif; ?>
        
        <?php if ($column2_data) : ?>
            <div class="hoc-category-highlights__column">
                <a href="<?php echo esc_url($column2_data['link']); ?>" class="hoc-category-highlights__link">
                    <div class="hoc-category-highlights__image-wrapper">
                        <?php if ($column2_data['image_url']) : ?>
                            <img 
                                src="<?php echo esc_url($column2_data['image_url']); ?>" 
                                alt="<?php echo esc_attr($column2_data['image_alt']); ?>"
                                class="hoc-category-highlights__image"
                            />
                        <?php else : ?>
                            <div class="hoc-category-highlights__placeholder">
                                <?php echo esc_html($column2_data['name']); ?>
                            </div>
                        <?php endif; ?>
                        <?php if ($column2_title) : ?>
                            <div class="hoc-category-highlights__content">
                                <h2 class="hoc-category-highlights__title"><?php echo esc_html($column2_title); ?></h2>
                            </div>
                        <?php endif; ?>
                    </div>
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>

