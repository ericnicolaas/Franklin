/**
 * This file adds some LIVE to the Theme Customizer live preview.
 */
( function( $ ) {	

	var

	updateAccentColour = function(value) {
		$('a:not(.button, #site-navigation a), #site-navigation .menu-button, .block-title, .widget-title, .page-title, .post-title, .pledge-level.not-available .pledge-limit, .post-author i, .button.accent.button-alt, .hovering .on-hover').css('color', value);
		$('.campaign-button, .active-campaign, .sticky, .button.accent').css('background-color', value);
		$('.button.accent').css('box-shadow', '0 0 0 0.3rem ' + value);
		$('#site-navigation .hovering > a, .button.accent.button-alt').css('border-color', value);
	},

	updateAccentHover = function(value) {
		$('.sticky .post-title, .barometer .filled, .button.accent').css('border-color', value);
	},

	updateAccentText = function(value) {
		$('.campaign-button, .active-campaign, .sticky, .button.accent').css('color', value);
	}, 

	updateBodyBackground = function(value) {
		$('body, .audiojs .loaded').css('background-color', value);
		$('.audiojs .play-pause').css('border-right-color', value);
	}, 

	updateBodyText = function(value) {
		$('body, .with-icon:before, .icon, .widget_search #searchsubmit::before, .button.button-alt, #site-navigation a, .block-title.with-icon i, .meta a, .format-status .post-title, .countdown_holding span').css('color', value)
		$('.footer-widget .widget-title').css('text-shadow', '0 1px 0 ' + value);
		$('.button.button-alt, .shadow-wrapper::before, .shadow-wrapper::after').css('border-color', value);
		$('input[type=submit], input[type=reset], button, .button, .audiojs').css('background-color', value);
		$('input[type=submit], input[type=reset], button, .button').css('box-shadow', '0 0 0 3px ' + value);
	},

	updateButtonText = function(value) {
		$('input[type=submit], input[type=reset], button, .button, .active-campaign .campaign-button, #site-navigation .menu-button, .sticky.block, .sticky.block a').css('color', value);
		$('.campaign-support').css('box-shadow', '0 0 0 3px' + value);
	},
	
	updateWrapperBackground = function (value) {
		$('#main, #header, #site-navigation ul, .even td, .widget td, .widget input[type=text], .widget input[type=password], .widget input[type=email], .widget input[type=number]').css('background-color', value);
	},

	updatePostsBackground = function (value) {
		$('.entry-block, .content-block, .reveal-modal.multi-block .content-block, .widget th, .widget tfoot td, .format-status .meta, .format-quote .entry blockquote, .audiojs .progress, .comments-section, .campaign-pledge-levels.accordion .pledge-level').css('background-color', value);
		$('.entry-block').css('box-shadow', '0 0 1px ' + value);
		$('.sticky.block').css('border-color', value);
	},

	updateWidgetBackground = function (value) {
		$('input[type=text], input[type=password], input[type=number], input[type=email], textarea, .featured-image, th, .entry blockquote, hr, pre, .meta, .audiojs .scrubber, .widget, .sidebar-block, .accordion h3').css('background-color', value);
	},

	updatePrimaryBorder = function (value) {
		$('#header, .widget_search #s, #site-navigation li, .block, .page-title, .block-title, .post-title, .meta, .meta .author, .meta .comment-count, .meta .tags, .comment, .pingback, .widget, .campaign-pledge-levels.accordion h3, .campaign-pledge-levels.accordion .pledge-level, .multi-block .content-block:nth-of-type(1n+2), #edd_checkout_form_wrap legend, table, td, th').css('border-color', value);
	},

	updateSecondaryBorder = function (value) {
		$('th').css('border-right-color', value);
		$('#site-navigation ul').css('border-top-color', value);
		$('.widget-title').css('border-color', value);
	},

	updateMetaColour = function (value) {
		$('.meta, .comment-meta, .pledge-limit').css('color', value);
	},

	updateFooterText = function (value) {
		$('#site-footer, #site-footer a').css('color', value);
	},

	updateFooterTitles = function (value) {
		$('.footer-widget .widget-title').css('color', value);
	}, 

	updateBodyTexture = function(value) {
		console.log( value );
		$('body').css('background-image', 'url(' + value + ')');
	}, 

	updateCampaignTexture = function(value) {
		$('.active-campaign').css('background-image', 'url(' + value + ')');
	};

	// Update the site title in real time...
	wp.customize( 'blogname', function( value ) {
		value.bind( function( newval ) {
			$( '.site_title a' ).html( newval );
		} );
	} );
	
	// Update the site description in real time...
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( newval ) {
			$( '.tagline' ).html( newval );
		} );
	} );

	// Update the logo in real time...
	wp.customize( 'logo_url', function( value ) {		
		value.bind( function( newval ) {			

			// Get the image dimensions
			var img = new Image();
			img.src = newval;
			img.onload = function() {
				if ( newval.length > 0 ) {
					$('.site_title a').css( {
						'background' : 'url('+newval+') no-repeat left 50%', 
						'padding-left' : img.width + 10
					} );
				}
			}			
		} ); 
	} );

	// Hide the site title
	wp.customize( 'hide_site_title', function( value ) {
		value.bind( function( newval ) {
			$( '.site_title' ).toggleClass('hidden', newval);
		} );
	} );

	// Hide the site description
	wp.customize( 'hide_site_tagline', function( value ) {
		value.bind( function( newval ) {
			$( '.tagline' ).toggleClass('hidden', newval);
		} );
	} );

	//  Update colours
	wp.customize( 'accent_colour', function( value ) {
		value.bind( function( newval ) {			
			updateAccentColour( newval );			
		} );
	} );
	wp.customize( 'accent_hover', function( value ) {
		value.bind( function( newval ) {
			updateAccentHover( newval );
		} );
	} );
	wp.customize( 'accent_text', function( value ) {
		value.bind( function( newval ) {
			updateAccentText( newval );
		} );  
	} );
	wp.customize( 'body_background', function( value ) {
		value.bind( function( newval ) {
			updateBodyBackground( newval );
		});
	} );
	wp.customize( 'body_text', function( value ) {
		value.bind( function( newval ) {
			updateBodyText( newval );
		});
	} );
	wp.customize( 'button_text', function( value ) {
		value.bind( function( newval ) {
			updateButtonText( newval );
		});
	} );
	wp.customize( 'wrapper_background', function( value ) {
		value.bind( function( newval ) {
			updateWrapperBackground( newval );
		});
	} );
	wp.customize( 'posts_background', function( value ) {
		value.bind( function( newval ) {
			updatePostsBackground( newval );
		});
	} );
	wp.customize( 'widget_background', function( value ) {
		value.bind( function( newval ) {
			updateWidgetBackground( newval );
		});
	} );
	wp.customize( 'primary_border', function( value ) {
		value.bind( function( newval ) {
			updatePrimaryBorder( newval );
		});
	} );
	wp.customize( 'secondary_border', function( value ) {
		value.bind( function( newval ) {
			updateSecondaryBorder( newval );
		});
	} );
	wp.customize( 'meta_colour', function( value ) {
		value.bind( function( newval ) {
			updateMetaColour( newval );
		});
	} );
	wp.customize( 'footer_text', function( value ) {
		value.bind( function( newval ) {
			updateFooterText( newval );
		});
	} );
	wp.customize( 'footer_titles', function( value ) {
		value.bind( function( newval ) {
			updateFooterTitles( newval );
		});
	} );

	// Textures
	wp.customize( 'body_texture', function( value ) {
		value.bind( function( newval ) {
			console.log( newval );
			updateBodyTexture( newval );
		});
	} );
	wp.customize( 'body_texture_custom', function( value ) {
		value.bind( function( newval ) {
			updateBodyTexture( newval );
		});
	} );
	wp.customize( 'campaign_texture', function( value ) {
		value.bind( function( newval ) {
			updateCampaignTexture( newval );
		});
	} );
	wp.customize( 'campaign_texture_custom', function( value ) {
		value.bind( function( newval ) {
			updateCampaignTexture( newval );
		});
	} );

} )( jQuery ); 