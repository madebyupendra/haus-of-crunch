<?php
/**
 * Container Component
 * ----------------
 * Usage:
 * get_template_part('components/container', null, [
 *   'content' => '<p>Hello World</p>', // Direct content or HTML string
 *   'class'   => '',                   // Extra custom classes
 * ]);
 */

// Get args from query vars (set by hoc_get_component) or direct $args
$component_args = get_query_var('component_args', []);
$args = !empty($args) ? $args : $component_args;

$content = $args['content'] ?? '';
$class   = $args['class'] ?? '';

$classes = trim("hoc-container $class");
?>

<div class="<?php echo esc_attr($classes); ?>">
  <?php echo wp_kses_post($content); ?>
</div>
