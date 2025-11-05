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

$content = $args['content'] ?? '';
$class   = $args['class'] ?? '';

$classes = trim("hoc-container $class");
?>

<div class="<?php echo esc_attr($classes); ?>">
  <?php echo $content; ?>
</div>
