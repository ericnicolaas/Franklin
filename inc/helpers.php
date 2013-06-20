<?php

/**
 * A collection of helper functions that are used in the theme. 
 * 
 * @package Projection
 * @author Studio164a
 */

/**
 * Returns whether crowdfunding is enabled.
 * 
 * @return bool
 * @since Projection 0.1
 */
function sofa_using_crowdfunding() {
	return get_projection_theme()->crowdfunding_enabled;
}

/**
 * Strips the first anchor from the content.
 * 
 * @param string $content
 * @param int $limit
 * @return string
 * @since Projection 1.0
 */
function sofa_strip_anchors($content, $limit = 1) {
	return preg_replace('/<a(.*)>(.*)<\/a>/', '', $content, $limit);
}

/**
 * Returns the anchors from the content.
 *
 * @param string $content
 * @return array 					Will return an empty array if there are no matches.
 * @since Projection 1.0
 */
function sofa_get_first_anchor($content) {
	// if (!preg_match( '/<a\s[^>]*?href=[\'"](.+?)[\'"]/is', $content, $matches))
	// 	return false;

	// return $matches;
	preg_match('/<a(.*)>(.*)<\/a>/', $content, $matches);
	return $matches;
}

/**
 * Returns the first embed shortcode from the content.
 *
 * @param string $content
 * @return array 					Will return an empty array if there are no matches.
 * @since Projection 1.0
 */
function sofa_get_embed_shortcode($content) {
	preg_match('/\[embed(.*)](.*)\[\/embed]/', $content, $matches);
	return $matches;
}

/**
 * Returns the images for the gallery.
 *
 * @param string $content
 * @return array
 * @since Projection 1.0
 */
function sofa_do_first_embed() {
	global $post, $wp_embed;

	// Get the first embed
	$match = sofa_get_embed_shortcode($post->post_content);

	if ( empty( $match ) ) 
		return;

	return $wp_embed->run_shortcode( $match[0] );
}

/**
 * Strips the embed shortcodes from the content.
 *
 * @param string $content
 * @param int $limit 		Optional. Allows you to define how many of the shortcodes will be stripped. Defaults to -1.
 * @return string
 * @since Projection 1.0
 */
function sofa_strip_embed_shortcode($content, $limit = '-1' ) {
	return preg_replace('/\[embed(.*)](.*)\[\/embed]/', '', $content, $limit);	
}