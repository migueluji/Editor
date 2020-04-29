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
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'gamesonomy' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '(sF6^,uelwM!f$PX6Vr=Z|lrK4#5AVZAz}m0hv6[`f[C~PU*www4~H8QaQ*aQ[#h' );
define( 'SECURE_AUTH_KEY',  '}C$s:H:vr/3:nZEML?ySW$w%ys!F|xcQu7kHq<cDX4+SzXE!|8_[h}QgQcz|Q/p{' );
define( 'LOGGED_IN_KEY',    'S#E^ghio#w|68$1V>-0.R~,7=5pP,7K>vDdeKzsqpA8pq!H@a5R7{[4UgoN!Qn|;' );
define( 'NONCE_KEY',        ';-bq -GwiO-Wo4,?+!YHw*uu=mH_y4IH[hyu3!m4_0ui(FL}lt;w2x$k5/RvCpgE' );
define( 'AUTH_SALT',        'mXdEW$8]OSraDa2Ht5)CC&Yx+jx?0w@*$5L~c`Zu,B4[}zH(TR j+hrH8/WVS%V3' );
define( 'SECURE_AUTH_SALT', '8L<(BL;.h5Ynh#sdan}Q4}qwlE[y%Rr|0YfF3= ff5?Gix9y,+*gh+!%=)nYr^BZ' );
define( 'LOGGED_IN_SALT',   'OjKQGG|xVS802//nwo!gvvE!;r_T@nWXwy]}A4,lJ:FE/ZrKf2b<&T:wLIxScAJB' );
define( 'NONCE_SALT',       'Vfmhl3EqamltkkmP68boN+llNS[n@#Oqb~c}G~a;[J+A3qpp3I-@1(b[i8|RxwKH' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
