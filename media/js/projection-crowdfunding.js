( function( $ ){

	// Start the countdown
	var $countdown = $('.countdown'), 
		enddate = $countdown.data().enddate;

	$countdown.countdown({until: new Date( enddate.year, enddate.month-1, enddate.day ), format: 'dHMs'});

	// Set up Raphael on window load event
	$(window).load(function() {
		var $barometer = $('.barometer'), 
			r = Raphael( $barometer[0], 146, 146), 
			progress_val = $barometer.data('progress'),
			progress,
			circle;

			console.log(progress_val);

		// circle.attr({ stroke: '#fff', 'stroke-width' : 12 });

		// var progress_path =

		// @see http://stackoverflow.com/questions/5061318/drawing-centered-arcs-in-raphael-js
		r.customAttributes.arc = function (xloc, yloc, value, total, R) {
			var alpha = 360 / total * value,
				a = (90 - alpha) * Math.PI / 180,
				x = xloc + R * Math.cos(a),
				y = yloc - R * Math.sin(a),
				path;

			if (total == value) {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
				];
			} else {
				path = [
					["M", xloc, yloc - R],
					["A", R, R, 0, +(alpha > 180), 1, x, y]
				];
			}
			return {
				path: path
			};
		};		

		circle = r.path().attr({
			stroke: '#fff', 
			'stroke-width' : 11, 
			arc: [74, 74, 100, 100, 66]
		});

		progress = r.path().attr({ 
			stroke: SofaCrowdfunding.button_colour, 
			'stroke-width' : 12, 
			arc: [74, 74, 0, 100, 66]
		});

		progress.animate({
			arc: [74, 74, progress_val, 100, 66]
		}, 1500, "backOut", function() {
			$barometer.find('span').animate( { opacity: 1}, 300, 'linear');
		});
	});

	$(document).ready( function() {
		$('.campaign-button').on( 'click', function() {
			$(this).toggleClass('icon-remove');
			$(this).parent().toggleClass('is-active');
		});

		$('.edd_download_purchase_form').on('change', '.pledge-level', function() {
			$('input[name=projection_custom_price]').val( $(this).data().price );
		})
		.on('change', 'input[name=projection_custom_price]', function() {
			var pledge = $(this).val(), 
				$minpledge = $('.pledge-level').first(),				
				$maxpledge;

			// The pledge has to equal or exceed the minimum pledge amount
			if ( $minpledge.data().price > pledge ) {

				// Explain that the pledge has to be at least the minimum
				alert( PROJECTION.messages.need_minimum_pledge );

				// Select the minimum pledge amount
				$minpledge.find('input').prop('checked', true);
				$minpledge.change();

				// Exit
				return;
			}

			$('.pledge-level').each( function() {
				if ( $(this).data().price <= pledge && $(this).hasClass('not-available') === false ) {
					$maxpledge = $(this);
				} 
				// This pledge's amount is greater than the amount set
				else {										
					return false;
				}
			});

			// Select the maximum pledge
			$maxpledge.find('input').prop('checked', true);
		});
	});	

})(jQuery);