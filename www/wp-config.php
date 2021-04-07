<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'mFP9XPcogJKZD> FI|cIvwg3Rx$4$hBqAKQ-c}/>XU^@Uqy=?pL?aEtY!|)R$eYd');
define('SECURE_AUTH_KEY',  'M[&y?}sVh/6Cq7d$~=lt$*& #VO4KQ1IdAmId3& :}-{+$/|$M4]ciR^9GxH|Q|H');
define('LOGGED_IN_KEY',    '@!4D;5E2SHAX0b68^R7WMz?@xF@0.[c7{OWmoyc(Rw4kggn:,uoyDf8!XRVND4bg');
define('NONCE_KEY',        '%n(S$/^nBA]ts-!Xi6V1#L3{wM7Kdu!,1muej_<?qV@qtqqxr&|na o*baM6L9xC');
define('AUTH_SALT',        'PZ}5&e*rP;OeN@j((eEB.,/AEskf  +Dsjz*r-cGQ_1i]Mpq0wi)B<@ 7@&.<sY%');
define('SECURE_AUTH_SALT', '-yo@mFi^v(kYH@cY|Z;TkrgQD/W|sa7kHy2+F}!zGI[B|,4yz1+g1et|flsNth;=');
define('LOGGED_IN_SALT',   '%UJy$I@lPd+R>G4&+z&xBKYRK1KlZd.PriU^ZD(%m~-j `+<L;m&_Ig*}Yw@U2 )');
define('NONCE_SALT',       'VEP&/3.[LpQpO!X-|JEuke$^8-^m]2HmS=eougo-3PYub<r*cXH2xq+IL8B9d+)V');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
