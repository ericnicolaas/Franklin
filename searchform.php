<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label for="s" class="assistive-text"><?php _e( 'Search', 'textural' ); ?></label>
	<input type="text" class="field" name="s" id="s" placeholder="<?php esc_attr_e( 'Search', 'textural' ); ?>" />	
	<button type="submit" class="icon" id="searchsubmit" data-icon="&#xf002;"></button>
</form>