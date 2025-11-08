<?php
/**
 * Single Product Meta
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/meta.php.
 *
 * @see         https://woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     9.7.0
 */

use Automattic\WooCommerce\Enums\ProductType;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product;
?>
<div class="product_meta">

	<?php do_action( 'woocommerce_product_meta_start' ); ?>

	<?php if ( wc_product_sku_enabled() && ( $product->get_sku() || $product->is_type( ProductType::VARIABLE ) ) ) : ?>

		<span class="sku_wrapper">• <?php esc_html_e( 'SKU:', 'woocommerce' ); ?> <span class="sku"><?php echo ( $sku = $product->get_sku() ) ? $sku : esc_html__( 'N/A', 'woocommerce' ); ?></span></span>

	<?php endif; ?>

	<?php
	// Display brand with bullet point (check both possible taxonomies)
	$brand_terms = get_the_terms( $product->get_id(), 'product_brand' );
	if ( empty( $brand_terms ) || is_wp_error( $brand_terms ) ) {
		$brand_terms = get_the_terms( $product->get_id(), 'pa_brand' );
	}
	if ( ! empty( $brand_terms ) && ! is_wp_error( $brand_terms ) ) {
		$brand_names = array();
		foreach ( $brand_terms as $brand ) {
			$brand_names[] = esc_html( $brand->name );
		}
		echo '<span class="brand_wrapper">• ' . esc_html__( 'Brand:', 'woocommerce' ) . ' ' . implode( ', ', $brand_names ) . '</span>';
	}
	?>

	<?php
	// Removed category display - only show tags
	echo wc_get_product_tag_list( $product->get_id(), ', ', '<span class="tagged_as">• ' . _n( 'Tag:', 'Tags:', count( $product->get_tag_ids() ), 'woocommerce' ) . ' ', '</span>' );
	?>

	<?php do_action( 'woocommerce_product_meta_end' ); ?>

</div>

