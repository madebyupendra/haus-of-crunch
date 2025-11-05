<?php
/**
 * Section Component
 * ----------------
 * Usage:
 * get_template_part('components/section', null, [
 *   'content'   => '<h2>Featured Products</h2>', // HTML content
 *   'class'     => '',                           // Optional extra classes
 *   'background'=> 'default',                    // default | secondary | product
 *   'id'        => '',                           // Optional ID for anchors
 * ]);
 */

$content    = $args['content'] ?? '';
$class      = $args['class'] ?? '';
$background = $args['background'] ?? 'default';
$id         = $args['id'] ?? '';

$classes = trim("hoc-section hoc-section--$background $class");
?>

<section <?php if ($id) echo 'id="' . esc_attr($id) . '"'; ?> class="<?php echo esc_attr($classes); ?>">
  <div class="hoc-container">
    <?php echo $content; ?>
  </div>
</section>
