<?php
/**
 * Button Component
 * ----------------
 * Usage:
 * get_template_part('components/button', null, [
 *   'label'   => 'Add to Cart',
 *   'variant' => 'primary', // primary | secondary | ghost
 *   'size'    => 'md',      // sm | md | lg
 *   'url'     => '#',       // optional - if provided, renders as <a> tag
 *   'type'    => 'button',  // button | submit | reset
 *   'name'    => '',        // optional - for form buttons
 *   'value'   => '',        // optional - for form buttons
 *   'class'   => '',        // optional extra classes
 *   'disabled'=> false      // optional
 * ]);
 */

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

$label    = $args['label'] ?? 'Button';
$variant  = $args['variant'] ?? 'primary';
$size     = $args['size'] ?? 'md';
$url      = $args['url'] ?? null;
$type     = $args['type'] ?? 'button';
$class    = $args['class'] ?? '';
$disabled = !empty($args['disabled']) ? 'disabled' : '';
$name     = $args['name'] ?? '';
$value    = $args['value'] ?? '';

$base_class = 'hoc-btn';
$classes = trim("$base_class hoc-btn--$variant hoc-btn--$size $class");

if ($url) :
?>
  <a href="<?php echo esc_url($url); ?>" class="<?php echo esc_attr($classes); ?>" <?php echo $disabled ? 'aria-disabled="true"' : ''; ?>>
    <?php echo esc_html($label); ?>
  </a>
<?php else : ?>
  <button 
    type="<?php echo esc_attr($type); ?>" 
    class="<?php echo esc_attr($classes); ?>" 
    <?php echo $disabled; ?>
    <?php if ($name) echo 'name="' . esc_attr($name) . '"'; ?>
    <?php if ($value) echo 'value="' . esc_attr($value) . '"'; ?>
  >
    <?php echo esc_html($label); ?>
  </button>
<?php endif; ?>
