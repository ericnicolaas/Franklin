<?php if ( sofa_using_crowdfunding() === false ) return ?>

<?php $campaign = sofa_crowdfunding_get_campaign() ?>	

<?php if ( $campaign === false ) return ?>

<!-- Active campaign -->
<section class="active-campaign cf">

	<div class="shadow-wrapper">

		<div class="campaign-excerpt"><?php the_excerpt() ?></div>	

		<?php if ( has_post_thumbnail( $campaign->ID ) ) : ?>
			<?php echo get_the_post_thumbnail( $campaign->ID ) ?>
		<?php endif ?>

		<div class="campaign-summary cf">		

			<p class="campaign-support"><a class="button button-large" data-reveal-id="campaign-form" href="#"><?php _e( 'Support', 'projection' ) ?></a></p>

			<div class="barometer">
				<span><?php printf( _x( "%s Funded", 'x percent funded', 'projection' ), '<span>'.$campaign->percent_completed(true).'</span>' ) ?></span>
			</div>		

			<ul>
				<li class="campaign-raised">
					<span><?php echo $campaign->current_amount() ?></span>
					<?php _e( 'Pledged', 'projection' ) ?>		
				</li>
				<li class="campaign-goal">
					<span><?php echo $campaign->goal() ?></span>
					<?php _e( 'Goal', 'projection' ) ?>				
				</li>
				<li class="campaign-backers">
					<span><?php echo $campaign->backers_count() ?></span>
					<?php _e( 'Backers', 'projection' ) ?>
				</li>
				
	<!-- 			<li class="campaign-end">
					<span><?php _e( 'End date', 'projection' ) ?></span>
					<?php echo mysql2date( 'j F, Y', $campaign->__get( 'campaign_end_date' ) ) ?>
				</li> -->			
			</ul>

			<div class="campaign-countdown">
				<span class="countdown" data-enddate='<?php echo sofa_crowdfunding_get_enddate($campaign, true) ?>'></span>
				<span><?php _e( 'Time left to donate', 'projection' ) ?></span>
			</div>

			<?php //echo projection_get_enddate_json($campaign, true) ?>		

		</div>

	</div>	

</section>
<!-- End active campaign -->