/**
 * Customizer controls.
 *
 * @package Spacious
 */
(
	function ( $ ) {

		/* Internal shorthand */
		var api = wp.customize;

		/**
		 * Helper class for the main Customizer interface.
		 *
		 * @class SpaciousCustomizer
		 */
		SpaciousCustomizer = {

			controls : {},

			/**
			 * Initializes our custom logic for the Customizer.
			 *
			 * @method init
			 */
			init : function () {
				SpaciousCustomizer._initToggles();
			},

			/**
			 * Initializes the logic for showing and hiding controls
			 * when a setting changes.
			 *
			 * @since 1.0.0
			 * @access private
			 * @method _initToggles
			 */
			_initToggles : function () {

				// Trigger the Adv Tab Click trigger.
				SpaciousControlTrigger.triggerHook( 'spacious-toggle-control', api );

				// Loop through each setting.
				$.each(
					SpaciousCustomizerToggles,
					function ( settingId, toggles ) {

						// Get the setting object.
						api(
							settingId,
							function ( setting ) {

								// Loop though the toggles for the setting.
								$.each(
									toggles,
									function ( i, toggle ) {
										// Loop through the controls for the toggle.
										$.each(
											toggle.controls,
											function ( k, controlId ) {
												// Get the control object.
												api.control(
													controlId,
													function ( control ) {

														// Define the visibility callback.
														var visibility = function ( to ) {
															control.container.toggle( toggle.callback( to ) );
														};

														// Init visibility.
														visibility( setting.get() );

														// Bind the visibility callback to the setting.
														setting.bind( visibility );

													}
												);
											}
										);
									}
								);
							}
						);

					}
				);
			}

		};

		$(
			function () {
				SpaciousCustomizer.init();
			}
		);

	}
)( jQuery );
