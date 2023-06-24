<?php
/**
Plugin Name: Product Video Gallery for Woocommerce
Description: Adding Product YouTube Video and Instantly transform the gallery on your WooCommerce Product page into a fully Responsive Stunning Carousel Slider.
Author: NikHiL Gadhiya
Author URI: https://www.technosoftwebs.com
Date: 17/05/2023
Version: 1.4.2.1
Text Domain: product-video-gallery-slider-for-woocommerce
WC requires at least: 2.3
WC tested up to: 7.7.0

@package WC_PRODUCT_VIDEO_GALLERY
-------------------------------------------------*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'NICKX_PLUGIN_URL', 'https://www.technosoftwebs.com/' );
define( 'NICKX_PLUGIN_VERSION', '1.4.2.1' );

require_once __DIR__ . '/admin/js/nickx_live.php';

/**
	Activation
 */
function nickx_activation_hook_callback() {
	set_transient( 'nickx-plugin_setting_notice', true, 0 );
	if ( empty( get_option( 'nickx_slider_layout' ) ) ) {
		update_option( 'nickx_slider_layout', 'horizontal' );
		update_option( 'nickx_slider_responsive', 'no' );
		update_option( 'nickx_sliderautoplay', 'no' );
		update_option( 'nickx_sliderfade', 'no' );
		update_option( 'nickx_slider_swipe', 'no' );
		update_option( 'nickx_arrowinfinite', 'yes' );
		update_option( 'nickx_arrowdisable', 'yes' );
		update_option( 'nickx_arrow_thumb', 'no' );
		update_option( 'nickx_hide_thumbnails', 'no' );
		update_option( 'nickx_hide_thumbnail', 'yes' );
		update_option( 'nickx_gallery_action', 'no' );
		update_option( 'nickx_adaptive_height', 'yes' );
		update_option( 'nickx_place_of_the_video', 'no' );
		update_option( 'nickx_videoloop', 'no' );
		update_option( 'nickx_vid_autoplay', 'no' );
		update_option( 'nickx_template', 'no' );
		update_option( 'nickx_controls', 'yes' );
		update_option( 'nickx_show_lightbox', 'yes' );
		update_option( 'nickx_show_zoom', 'yes' );
		update_option( 'nickx_mobile_zoom', 'no' );
		update_option( 'nickx_zoomlevel', 1 );
		update_option( 'nickx_show_only_video', 'no' );
		update_option( 'nickx_thumbnails_to_show', 4 );
		update_option( 'nickx_arrowcolor', '#000' );
		update_option( 'nickx_arrowbgcolor', '#FFF' );
	}
}

register_activation_hook( __FILE__, 'nickx_activation_hook_callback' );
if ( is_admin() ) {
    require_once __DIR__ . '/admin/class-setting.php';
    require_once __DIR__ . '/admin/class-video-field.php';
	new WC_PRODUCT_VIDEO_GALLERY_SETTING();
	new WC_PRODUCT_VIDEO_GALLERY_VIDEO_FIELD();
} else {
    require_once __DIR__ . '/public/class-rendering.php';
}
function nickx_error_notice_callback_notice() {
	echo '<div class="error"><p><strong>Product Video Gallery for Woocommerce</strong> requires WooCommerce to be installed and active. You can download <a href="https://woocommerce.com/" target="_blank">WooCommerce</a> here.</p></div>';
}
add_action( 'plugins_loaded', 'nickx_remove_woo_hooks' );
function nickx_remove_woo_hooks() {
	if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
	}
	if ( ( is_multisite() && is_plugin_active_for_network( 'woocommerce/woocommerce.php' ) ) || is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
		if( !is_admin() ){
			$nickx_rendering_obj = new WC_PRODUCT_VIDEO_GALLERY_RENDERING();
			remove_action( 'woocommerce_before_single_product_summary_product_images', 'woocommerce_show_product_thumbnails', 20 );
			remove_action( 'woocommerce_product_thumbnails', 'woocommerce_show_product_thumbnails', 20 );
			if ( get_option( 'nickx_hide_thumbnails' ) != 'yes' ) {
				add_action( 'woocommerce_product_thumbnails', array( $nickx_rendering_obj, 'nickx_show_product_thumbnails' ), 20 );
			}
			if ( get_option( 'nickx_gallery_action' ) != 'yes' ) {
				remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 10 );
				remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
				add_action( 'woocommerce_before_single_product_summary', array( $nickx_rendering_obj, 'nickx_show_product_image' ), 10 );
			}
			add_action( 'wp_head', array( $nickx_rendering_obj, 'nickx_get_nickx_video_schema' ) );
		}
	} else {
		add_action( 'admin_notices', 'nickx_error_notice_callback_notice' );
	}
}