<?php
/**
 * Button Component
 * ----------------
 * Usage:
 * get_template_part('components/button', null, [
 *   'label'   => 'Add to Cart',
 *   'variant' => 'primary', // primary | secondary | ghost
 *   'size'    => 'md',      // sm | md | lg
 *   'url'     => '#',       // optional
 *   'type'    => 'button',  // button | submit | reset
 *   'class'   => '',        // optional extra classes
 *   'disabled'=> false      // optional
 * ]);
 */

$label    = $args['label'] ?? 'Button';
$variant  = $args['variant'] ?? 'primary';
$size     = $args['size'] ?? 'md';
$url      = $args['url'] ?? null;
$type     = $args['type'] ?? 'button';
$class    = $args['class'] ?? '';
$disabled = !empty($args['disabled']) ? 'disabled' : '';

$base_class = 'hoc-btn';
$classes = trim("$base_class hoc-btn--$variant hoc-btn--$size $class");

if ($url) :
?>
  <a href="<?php echo esc_url($url); ?>" class="<?php echo esc_attr($classes); ?>" <?php echo $disabled ? 'aria-disabled="true"' : ''; ?>>
    <?php echo esc_html($label); ?>
  </a>
<?php else : ?>
  <button type="<?php echo esc_attr($type); ?>" class="<?php echo esc_attr($classes); ?>" <?php echo $disabled; ?>>
    <?php echo esc_html($label); ?>
  </button>
<?php endif; ?>
