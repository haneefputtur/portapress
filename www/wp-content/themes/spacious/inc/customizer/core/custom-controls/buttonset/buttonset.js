/**
 * Radio buttonset control JS to handle the toggle of radio buttonsets.
 *
 * File `buttonset.js`.
 *
 * @package Spacious
 */
wp.customize.controlConstructor[ 'spacious-buttonset' ] = wp.customize.Control.extend( {

	ready : function () {

		'use strict';

		var control = this;

		// Change the value.
		this.container.on( 'click', 'input', function () {
			control.setting.set( jQuery( this ).val() );
		} );

	}

} );
