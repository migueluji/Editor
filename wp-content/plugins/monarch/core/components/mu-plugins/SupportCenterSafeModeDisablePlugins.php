<?php
/**
 * Plugin Name: Elegant Themes Support Center :: Safe Mode Plugin Disabler
 * Plugin URI: http://www.elegantthemes.com
 * Description: When the ET Support Center's Safe Mode is activated, this Must-Use Plugin will temporarily disable plugins for that user.
 * Author: Elegant Themes
 * Author URI: http://www.elegantthemes.com
 * License: GPLv2 or later
 *
 * @package ET\Core\SupportCenter\SafeModeDisablePlugins
 * @author Elegant Themes <http://www.elegantthemes.com>
 * @license GNU General Public License v2 <http://www.gnu.org/licenses/gpl-2.0.html>
 */

// Quick exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Disable Plugins (if Safe Mode is active)
 *
 * @since 3.20
 *
 * @param array $plugins WP's array of active plugins
 *
 * @return array
 */
function et_safe_mode_maybe_disable_plugins( $plugins = array() ) {
	$DEBUG = defined( 'ET_DEBUG' ) && ET_DEBUG;

	if ( ! isset( $_COOKIE['et-support-center-safe-mode'] ) ) {
		if ( $DEBUG ) {
			error_log( 'ET Support Center :: Safe Mode: No cookie found' );
		}

		return $plugins;
	}

	$verify = get_option( 'et-support-center-safe-mode-verify' );

	if ( ! $verify ) {
		if ( $DEBUG ) {
			error_log( 'ET Support Center :: Safe Mode: No option found to verify cookie' );
		}

		return $plugins;
	}

	if ( $_COOKIE['et-support-center-safe-mode'] !== $verify ) {
		if ( $DEBUG ) {
			error_log( 'ET Support Center :: Safe Mode: Cookie/Option mismatch' );
		}

		return $plugins;
	}

	/** @var array Collection of plugins that we will NOT disable when Safe Mode is activated. */
	$plugins_whitelist = get_option( 'et_safe_mode_plugins_whitelist' );

	$clean_plugins = $plugins;

	foreach ( $clean_plugins as $key => &$plugin ) {
		// Check whether this plugin appears in our whitelist
		if ( ! in_array( $plugin, $plugins_whitelist ) ) {
			if ( $DEBUG ) {
				error_log( 'ET Support Center :: Safe Mode: Unsetting plugin: ' . json_encode( $plugin ) );
			}
			unset( $clean_plugins[ $key ] );
		}
	}

	return $clean_plugins;
}

add_filter( 'option_active_plugins', 'et_safe_mode_maybe_disable_plugins' );
add_filter( 'option_active_sitewide_plugins', 'et_safe_mode_maybe_disable_plugins' );
