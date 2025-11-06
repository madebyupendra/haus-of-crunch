<?php
/**
 * Variation Selector Component
 * 
 * Nike-inspired button-based variation selector
 * Maintains WooCommerce compatibility with hidden selects
 * 
 * @package Haus_of_Crunch
 */

defined('ABSPATH') || exit;

// Get args from query vars or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

$attribute_name = $args['attribute'] ?? '';
$options = $args['options'] ?? [];
$product = $args['product'] ?? null;
$selected = $args['selected'] ?? false;
$label = $args['label'] ?? '';
$size_guide_url = $args['size_guide_url'] ?? '';

if (empty($attribute_name) || empty($options) || !$product) {
    return;
}

// Get selected value
if (false === $selected && $product instanceof WC_Product) {
    $selected_key = 'attribute_' . sanitize_title($attribute_name);
    // phpcs:disable WordPress.Security.NonceVerification.Recommended
    $selected = isset($_REQUEST[$selected_key]) ? wc_clean(wp_unslash($_REQUEST[$selected_key])) : $product->get_variation_default_attribute($attribute_name);
    // phpcs:enable WordPress.Security.NonceVerification.Recommended
}

// Build attribute name and ID for form fields
$field_name = 'attribute_' . sanitize_title($attribute_name);
$field_id = sanitize_title($attribute_name);
$attribute_label = wc_attribute_label($attribute_name);

// Get terms if this is a taxonomy
$terms = [];
if ($product && taxonomy_exists($attribute_name)) {
    $terms = wc_get_product_terms(
        $product->get_id(),
        $attribute_name,
        array('fields' => 'all')
    );
}

// Build options array with labels and values
$options_data = [];
foreach ($options as $option) {
    $option_value = '';
    $option_label = '';
    
    if ($product && taxonomy_exists($attribute_name)) {
        // Find matching term
        foreach ($terms as $term) {
            if (in_array($term->slug, [$option], true)) {
                $option_value = $term->slug;
                $option_label = apply_filters('woocommerce_variation_option_name', $term->name, $term, $attribute_name, $product);
                break;
            }
        }
    } else {
        // Text-based attribute
        $option_value = $option;
        $option_label = apply_filters('woocommerce_variation_option_name', $option, null, $attribute_name, $product);
    }
    
    if ($option_value) {
        $options_data[] = [
            'value' => esc_attr($option_value),
            'label' => esc_html($option_label),
            'selected' => sanitize_title($selected) === $option_value || (sanitize_title($selected) !== $selected && $selected === $option_value)
        ];
    }
}

// Use custom label if provided, otherwise use attribute label
$display_label = !empty($label) ? $label : $attribute_label;
?>

<div class="hoc-variation-selector" data-attribute="<?php echo esc_attr($attribute_name); ?>">
    
    <!-- Header with label and size guide link -->
    <div class="hoc-variation-selector__header">
        <h3 class="hoc-variation-selector__label">
            <?php echo esc_html($display_label); ?>
        </h3>
        <?php if ($size_guide_url) : ?>
            <a href="<?php echo esc_url($size_guide_url); ?>" class="hoc-variation-selector__size-guide" target="_blank" rel="noopener">
                <svg class="hoc-variation-selector__size-guide-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V14M2 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <?php esc_html_e('Size Guide', 'haus-of-crunch'); ?>
            </a>
        <?php endif; ?>
    </div>

    <!-- Hidden select for WooCommerce JS compatibility -->
    <!-- Use WooCommerce's function to ensure exact structure -->
    <?php
    // Output the select using WooCommerce's function, but we'll hide it
    ob_start();
    wc_dropdown_variation_attribute_options(
        array(
            'options'   => $options,
            'attribute' => $attribute_name,
            'product'   => $product,
            'selected'  => $selected,
        )
    );
    $select_html = ob_get_clean();
    
    // Add our custom class to hide it visually
    // WooCommerce's function may already add classes, so we need to append to existing class
    if (strpos($select_html, 'class=') !== false) {
        // Select already has a class, append to it
        $select_html = preg_replace('/(<select[^>]*class=["\'])([^"\']*)(["\'])/i', '$1$2 hoc-variation-selector__hidden-select$3', $select_html, 1);
    } else {
        // No class attribute, add one
        $select_html = preg_replace('/<select([^>]*)>/i', '<select$1 class="hoc-variation-selector__hidden-select"', $select_html, 1);
    }
    // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $select_html;
    ?>

    <!-- Button grid -->
    <div class="hoc-variation-selector__grid">
        <?php foreach ($options_data as $option) : ?>
            <button
                type="button"
                class="hoc-variation-selector__button <?php echo $option['selected'] ? 'hoc-variation-selector__button--selected' : ''; ?>"
                data-value="<?php echo $option['value']; ?>"
                data-attribute="<?php echo esc_attr($field_name); ?>"
                aria-label="<?php echo esc_attr(sprintf(__('Select %s', 'haus-of-crunch'), $option['label'])); ?>"
                aria-pressed="<?php echo $option['selected'] ? 'true' : 'false'; ?>"
            >
                <?php echo $option['label']; ?>
            </button>
        <?php endforeach; ?>
    </div>

</div>

