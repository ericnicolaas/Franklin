<?php
/**
 * A collection of miscellaneous helper functions used by the 
 * theme & child themes. 
 * 
 * @package cheers
 */

/** 
 * Get the currently active campaign. 
 * 
 * @return false|ATCF_Campaign
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_campaign() {
	return get_sofa_crowdfunding()->get_active_campaign();	
}

/**
 * Get the end date of the given campaign. 
 * 
 * @param ATCF_Campaign $campaign
 * @param bool $json_format 	
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_enddate( $campaign, $json_format = false ) {
	if ( false === ( $campaign instanceof ATCF_Campaign ) )
		return;
		
	$end_date = strtotime( $campaign->__get( 'campaign_end_date' ) );
	$end_date_array = array( 
		'year' => date('Y', $end_date), // Year
		'day' => date('d', $end_date), // Day
		'month' => date('n', $end_date), // Month
		'hour' => date('G', $end_date), // Hour
		'minute' => date('i', $end_date), // Minute
		'second' => date('s', $end_date)  // Second
	);

	return $json_format ? json_encode($end_date_array) : $end_date_array;
}

/**
 * Get the login page URL. 
 * 
 * @param string $page
 * @return string|false
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_page_url($page) {
	global $edd_options;
	return isset( $edd_options[$page] ) ? $edd_options[$page] : false;
}

/**
 * Get currency symbol. 
 * 
 * @return string
 * @since Projection 1.0
 */
function sofa_crowdfunding_edd_get_currency_symbol() {
	global $edd_options;

	$currency = edd_get_currency();

	switch ( $currency ) {
		case "GBP" : return '&pound;'; break;
		case "BRL" : return 'R&#36;'; break;
		case "USD" :
		case "AUD" :
		case "CAD" :
		case "HKD" :
		case "MXN" :
		case "SGD" : return '&#36;'; break;
		case "JPY" : return '&yen;'; break;
		default : return $currency;
	}	
}

/**
 * Get the payment ID for the log object.
 * 
 * @param WP_Post $log
 * @return int 
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_payment($log) {
	return get_post( get_post_meta( $log->ID, '_edd_log_payment_id', true ) ); 
}

/**
 * Get the avatar for the backer. 
 * 
 * @param WP_Post $backer
 * @param int $size
 * @return string
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_backer_avatar($backer, $size = 115) {
	return get_avatar( edd_get_payment_user_email($backer->ID), $size, '', $backer->post_title );
}

/**
 * Get the backer's location. 
 * 
 * @param WP_Post $backer
 * @return string|void
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_backer_location($backer) {
	$meta = get_post_meta( $backer->ID, '_edd_payment_meta', true );
	if ( !isset( $meta['shipping'] ) ) 
		return;
	
	return apply_filters('sofa_backer_location', sprintf( "%s, %s", $meta['shipping']['shipping_city'], $meta['shipping']['shipping_country'] ), $meta, $backer );
}

/**
 * Get the backer's pledge amount. 
 * 
 * @param WP_Post $backer
 * @param bool $formatted
 * @return string
 * @since Projection 1.0
 */
function sofa_crowdfunding_get_backer_pledge($backer, $formatted = true) {
	if ( $formatted ) {
		return edd_currency_filter( edd_format_amount( edd_get_payment_amount($backer->ID) ) );
	}

	return edd_get_payment_amount($backer->ID);	
}