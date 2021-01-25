<?php
/**
 * Extend WP_Customize_Control to add the radio image.
 *
 * Class Spacious_Radio_Image_Control
 *
 * @package    ThemeGrill
 * @subpackage Spacious
 * @since      Spacious 3.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to extend WP_Customize_Control to add the radio image customize control.
 *
 * Class Spacious_Radio_Image_Control
 */
class Spacious_Radio_Image_Control extends Spacious_Customize_Base_Additional_Control {

	/**
	 * Control's Type.
	 *
	 * @var string
	 */
	public $type = 'spacious-radio-image';

	/**
	 * Column for image.
	 *
	 * @var int
	 */
	public $image_col = 1;

	/**
	 * Refresh the parameters passed to the JavaScript via JSON.
	 *
	 * @see WP_Customize_Control::to_json()
	 */
	public function to_json() {

		parent::to_json();

		$this->json['default'] = $this->setting->default;
		if ( isset( $this->default ) ) {
			$this->json['default'] = $this->default;
		}
		$this->json['value'] = $this->value();

		$this->json['link']        = $this->get_link();
		$this->json['id']          = $this->id;
		$this->json['label']       = esc_html( $this->label );
		$this->json['description'] = $this->description;

		$this->json['image_col'] = $this->image_col;

		foreach ( $this->choices as $key => $value ) {
			$this->json['choices'][ $key ]        = $value['url'];
			$this->json['choices_titles'][ $key ] = $value['label'];
		}

		$this->json['inputAttrs'] = '';
		$this->json['labelStyle'] = '';
		foreach ( $this->input_attrs as $attr => $value ) {
			if ( 'style' !== $attr ) {
				$this->json['inputAttrs'] .= $attr . '="' . esc_attr( $value ) . '" ';
			} else {
				$this->json['labelStyle'] = 'style="' . esc_attr( $value ) . '" ';
			}
		}

	}

	/**
	 * An Underscore (JS) template for this control's content (but not its container).
	 *
	 * Class variables for this control class are available in the `data` JS object;
	 * export custom variables by overriding {@see WP_Customize_Control::to_json()}.
	 *
	 * @see    WP_Customize_Control::print_template()
	 *
	 * @access protected
	 */
	protected function content_template() {
		?>

		<div class="customizer-text">
			<# if ( data.label ) { #>
			<span class="customize-control-title">{{{ data.label }}}</span>
			<# } #>

			<# if ( data.description ) { #>
			<span class="description customize-control-description">{{{ data.description }}}</span>
			<# } #>
		</div>

		<div id="input_{{ data.id }}" class="image image-col-{{{ data.image_col }}}">
			<# for ( key in data.choices ) { #>
			<input {{{ data.inputAttrs }}}
			       class="image-select"
			       type="radio"
			       value="{{ key }}"
			       name="_customize-radio-{{ data.id }}"
			       id="{{ data.id }}{{ key }}"
			       {{{ data.link }}}
			<# if ( data.value === key ) { #> checked="checked"<# } #>
			>

			<label for="{{ data.id }}{{ key }}" {{{ data.labelStyle }}} class="spacious-radio-image">
				<img src="{{{ data.choices[ key ] }}}" alt="{{{ data.choices_titles[ key ] }}}">
				<span class="image-clickable" title="{{ data.choices_titles[ key ] }}"></span>
			</label>
			<# } #>
		</div>

		<?php
	}

	/**
	 * Don't render the control content from PHP, as it's rendered via JS on load.
	 */
	public function render_content() {
	}

}
