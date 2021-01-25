/**
 * Customizer dependency controls.
 *
 * @package Spacious
 */

(
	function ( $ ) {

		'use strict';

		/* Internal shorthand */
		var api = wp.customize;

		/**
		 * Helper class for the main Customizer interface.
		 *
		 * @class Spacious_Customizer_FrameWork
		 */
		var Spacious_Customizer_FrameWork = {

			controls : {},

			/**
			 * Initializes the logic for showing and hiding controls
			 * when a setting changes.
			 *
			 * @access private
			 * @method init
			 */
			init : function () {
				var $this = this;

				$this.handleDependency();
				$this.hideEmptySections();

				api.bind(
					'change',
					function ( setting, data ) {
						var has_dependents = $this.hasDependentControls( setting.id );

						if ( has_dependents ) {
							$this.handleDependency();
							$this.hideEmptySections();
						}
					}
				);
			},

			/**
			 * Handles dependency for controls.
			 *
			 * @access private
			 * @method handleDependency
			 */
			handleDependency : function () {
				var $this  = this,
				    values = api.get();

				$this.checked_controls = {};

				_.each(
					values,
					function ( value, id ) {
						var control = api.control( id );

						$this.checkControlVisibility( control, id );
					}
				);
			},

			/**
			 * Hide OR display controls according to dependency
			 *
			 * @access private
			 * @method checkControlVisibility
			 */
			checkControlVisibility : function ( control, id ) {
				var $this  = this,
				    values = api.get();

				if ( ! _.isUndefined( control ) ) {

					// If control has dependency defined.
					if ( 'undefined' != typeof SpaciousCustomizerControlsToggle[id] ) {
						var check            = false,
						    dependency_param = SpaciousCustomizerControlsToggle[id],
						    conditions       = ! _.isUndefined( dependency_param.conditions ) ? dependency_param.conditions : dependency_param,
						    operator         = ! _.isUndefined( dependency_param.operator ) ? dependency_param.operator : 'AND';

						if ( 'undefined' !== typeof conditions ) {
							check                     = $this.checkDependency( conditions, values, operator );
							this.checked_controls[id] = check;

							if ( ! check ) {
								control.container.addClass( 'spacious-hide' );
							} else {
								control.container.removeClass( 'spacious-hide' );
							}
						}
					}

				}
			},

			/**
			 * Checks dependency condtions for controls
			 *
			 * @access private
			 * @method checkDependency
			 */
			checkDependency : function ( conditions, values, compare_operator ) {

				var control   = this,
				    check     = true,
				    returnNow = false,
				    testValue = conditions[0];

				if ( _.isString( testValue ) ) {

					var cond     = conditions[1],
					    cond_val = conditions[2],
					    value;

					if ( ! _.isUndefined( SpaciousCustomizerControlsToggle[testValue] ) ) {
						var conditions = ! _.isUndefined( SpaciousCustomizerControlsToggle[testValue]['conditions'] ) ? SpaciousCustomizerControlsToggle[testValue]['conditions'] : SpaciousCustomizerControlsToggle[testValue];
						var operator   = ! _.isUndefined( SpaciousCustomizerControlsToggle[testValue]['operator'] ) ? SpaciousCustomizerControlsToggle[testValue]['operator'] : 'AND';

						if ( ! _.isUndefined( conditions ) ) {
							// Check visibility for dependent controls also.
							if ( ! control.checkDependency( conditions, values, operator ) ) {
								returnNow = true;
								check     = false;

								if ( 'AND' == compare_operator ) {
									return;
								}
							} else {
								var control_obj = api.control( testValue );

								control_obj.container.removeClass( 'spacious-hide' );
							}
						}
					}

					if ( ! _.isUndefined( values[testValue] ) && ! returnNow && check ) {
						value = values[testValue];
						check = control.compareValues( value, cond, cond_val );
					}

				} else if ( _.isArray( testValue ) ) {

					$.each(
						conditions,
						function ( index, val ) {

							var cond_key  = val[0],
							    cond_cond = val[1],
							    cond_val  = val[2],
							    test_val  = ! _.isUndefined( values[cond_key] ) ? values[cond_key] : '';

							if ( 'undefined' !== typeof SpaciousCustomizerControlsToggle[cond_key] ) {
								var conditions = ! _.isUndefined( SpaciousCustomizerControlsToggle[cond_key]['conditions'] ) ? SpaciousCustomizerControlsToggle[cond_key]['conditions'] : SpaciousCustomizerControlsToggle[cond_key];
								var operator   = ! _.isUndefined( SpaciousCustomizerControlsToggle[cond_key]['operator'] ) ? SpaciousCustomizerControlsToggle[cond_key]['operator'] : 'AND';

								if ( ! _.isUndefined( conditions ) ) {
									// Check visibility for dependent controls also.
									if ( ! control.checkDependency( conditions, values, operator ) ) {
										check = false;

										if ( 'AND' == compare_operator ) {
											return;
										}
									} else {
										check           = true;
										var control_obj = api.control( cond_key );

										control_obj.container.removeClass( 'spacious-hide' );
									}
								}
							} else {
								check = true;
							}

							if ( check ) {
								if ( 'AND' == compare_operator ) {
									if ( ! control.compareValues( test_val, cond_cond, cond_val ) ) {
										check = false;

										return false;
									}
								} else {
									if ( control.compareValues( test_val, cond_cond, cond_val ) ) {
										returnNow = true;
										check     = true;
									} else {
										check = false;
									}
								}
							}
						}

					);

					// Break loop in case of OR operator.
					if ( returnNow && 'OR' == compare_operator ) {
						check = true;
					}

				}

				return check;

			},

			/**
			 * Compare values of the dependent controls.
			 *
			 * @access private
			 * @method compareValues
			 */
			compareValues : function ( value1, condition, value2 ) {

				var equal = false;

				switch ( condition ) {

					case '===':
						equal = (
							value1 === value2
						) ? true : false;
						break;

					case '>':
						equal = (
							value1 > value2
						) ? true : false;
						break;

					case '<':
						equal = (
							value1 < value2
						) ? true : false;
						break;

					case '<=':
						equal = (
							value1 <= value2
						) ? true : false;
						break;

					case '>=':
						equal = (
							value1 >= value2
						) ? true : false;
						break;

					case '!=':
						equal = (
							value1 != value2
						) ? true : false;
						break;

					case 'empty':
						var _v = _.clone( value1 );

						if ( _.isObject( _v ) || _.isArray( _v ) ) {
							_.each(
								_v,
								function ( v, i ) {
									if ( _.isEmpty( v ) ) {
										delete _v[i];
									}
								}
							);

							equal = _.isEmpty( _v ) ? true : false;
						} else {
							equal = _.isNull( _v ) || _v == '' ? true : false;
						}
						break;

					case 'not_empty':
						var _v = _.clone( value1 );

						if ( _.isObject( _v ) || _.isArray( _v ) ) {
							_.each(
								_v,
								function ( v, i ) {
									if ( _.isEmpty( v ) ) {
										delete _v[i];
									}
								}
							)
						}

						equal = _.isEmpty( _v ) ? false : true;
						break;

					case 'contains':
						if ( _.isArray( value1 ) ) {
							if ( $.inArray( value2, value1 ) !== - 1 ) {
								equal = true;
							}
						}
						break;

					default:
						if ( _.isArray( value2 ) ) {
							if ( ! _.isEmpty( value2 ) && ! _.isEmpty( value1 ) ) {
								equal = _.contains( value2, value1 );
							} else {
								equal = false;
							}
						} else {
							equal = (
								value1 == value2
							) ? true : false;
						}
						break;

				}

				return equal;

			},

			/**
			 * Hide Section without Controls.
			 */
			hideEmptySections : function () {

				$( 'ul.accordion-section.control-section-spacious_section' ).each(
					function () {
						var parentId  = $( this ).attr( 'id' ),
						    visibleIt = false,
						    controls  = $( this ).find( ' > .customize-control' );

						if ( controls.length > 0 ) {
							controls.each(
								function () {
									if ( ! $( this ).hasClass( 'spacious-hide' ) && $( this ).css( 'display' ) != 'none' ) {
										visibleIt = true;
									}
								}
							);

							if ( ! visibleIt ) {
								$( '.control-section[aria-owns="' + parentId + '"]' ).addClass( 'spacious-hide' );
							} else {
								$( '.control-section[aria-owns="' + parentId + '"]' ).removeClass( 'spacious-hide' );
							}
						}
					}
				);

			},

			hasDependentControls : function ( control_id ) {
				var check = false;

				$.each(
					SpaciousCustomizerControlsToggle,
					function ( index, val ) {

						if ( ! _.isUndefined( val.conditions ) ) {
							var conditions = val.conditions;

							$.each(
								conditions,
								function ( index, val ) {

									var control = val[0];

									if ( control_id == control ) {
										check = true;
										return;
									}
								}
							);
						} else {
							var control = val[0];

							if ( control_id == control ) {
								check = true;

								return;
							}
						}

					}
				);

				return check;
			},

		};

		$(
			function () {
				Spacious_Customizer_FrameWork.init();
			}
		);

	}
)( jQuery );
