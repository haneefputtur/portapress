/**
 * Get Started button on welcome page.
 */
jQuery( document ).ready( function ( $ ) {

    $( '.btn-get-started' ).click( function ( e ) {
        e.preventDefault();

        // Show updating gif icon and update button text.
        $( this ).addClass( 'updating-message' ).text( spaciousRedirectDemoPage.btn_text );

        var btnData = {
            action   : 'import_button',
            security : spaciousRedirectDemoPage.nonce,
        };

        $.ajax( {
            type    : "POST",
            url     : ajaxurl, // URL to "wp-admin/admin-ajax.php"
            data    : btnData,
            success :function( response ) {
                var redirectUri,
                    dismissNonce,
                    extraUri   = '',
                    btnDismiss = $( '.spacious-message-close' );

                if ( btnDismiss.length ) {
                    dismissNonce = btnDismiss.attr( 'href' ).split( '_spacious_notice_nonce=' )[1];
                    extraUri     = '&_spacious_notice_nonce=' + dismissNonce;
                }

                redirectUri          = response.redirect + extraUri;
                window.location.href = redirectUri;
            },
            error   : function( xhr, ajaxOptions, thrownError ){
                console.log(thrownError);
            }
        } );
    } );
} );
