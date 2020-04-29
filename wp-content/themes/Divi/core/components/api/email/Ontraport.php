<?php

/**
 * Wrapper for Ontraport's API.
 *
 * @since   1.1.0
 *
 * @package ET\Core\API\Email
 */
class ET_Core_API_Email_Ontraport extends ET_Core_API_Email_Provider {
	/**
	 * @inheritDoc
	 */
	public $LISTS_URL = 'https://api.ontraport.com/1/objects?objectID=5';

	/**
	 * @inheritDoc
	 */
	public $SUBSCRIBE_URL = 'https://api.ontraport.com/1';

	/**
	 * @inheritDoc
	 */
	public $name = 'Ontraport';

	/**
	 * @inheritDoc
	 */
	public $slug = 'ontraport';

	/**
	 * @inheritDoc
	 * @internal If true, oauth endpoints properties must also be defined.
	 */
	public $uses_oauth = false;

	public function __construct( $owner = '', $account_name = '', $api_key = '' ) {
		parent::__construct( $owner, $account_name, $api_key );

		$this->_maybe_set_custom_headers();
	}


	protected function _maybe_set_custom_headers() {
		if ( empty( $this->custom_headers ) && isset( $this->data['api_key'] )  && isset( $this->data['client_id'] ) ) {
			$this->custom_headers = array(
				'Api-Appid' => sanitize_text_field( $this->data['client_id'] ),
				'Api-Key'   => sanitize_text_field( $this->data['api_key'] ),
			);
		}
	}

	/**
	 * @inheritDoc
	 */
	public function get_account_fields() {
		return array(
			'api_key'   => array(
				'label' => esc_html__( 'API Key', 'et_core' ),
			),
			'client_id' => array(
				'label' => esc_html__( 'APP ID', 'et_core' ),
			),
		);
	}

	/**
	 * @inheritDoc
	 */
	public function get_data_keymap( $keymap = array(), $custom_fields_key = '' ) {
		$keymap = array(
			'list'       => array(
				'name'              => 'name',
				'list_id'           => 'drip_id',
				'subscribers_count' => 'subscriber_count',
			),
			'subscriber' => array(
				'name'      => 'firstname',
				'last_name' => 'lastname',
				'email'     => 'email',
			),
		);

		return parent::get_data_keymap( $keymap, $custom_fields_key );
	}

	/**
	 * @inheritDoc
	 */
	public function fetch_subscriber_lists() {
		if ( empty( $this->data['api_key'] ) || empty( $this->data['client_id'] ) ) {
			return $this->API_KEY_REQUIRED;
		}

		$this->_maybe_set_custom_headers();

		$this->response_data_key = 'data';

		return parent::fetch_subscriber_lists();
	}

	public function get_subscriber( $email ) {
		$args = array(
			'objectID' => '0',
			'email' => rawurlencode( $email ),
		);

		$url = add_query_arg( $args, $this->SUBSCRIBE_URL . '/object/getByEmail' );

		$this->prepare_request( $url );
		$this->make_remote_request();

		return $this->data_utils->array_get( $this->response->DATA, 'data.id', false );
	}

	/**
	 * @inheritDoc
	 */
	public function subscribe( $args, $url = '' ) {
		if ( empty( $this->data['api_key'] ) || empty( $this->data['client_id'] ) ) {
			return $this->API_KEY_REQUIRED;
		}

		$list_id          = $args['list_id'];
		$args             = $this->transform_data_to_provider_format( $args, 'subscriber' );
		$args['objectID'] = 0;
		$url              = $this->SUBSCRIBE_URL . '/Contacts/saveorupdate';

		// Create or update contact
		$this->prepare_request( $url, 'POST', false, $args );
		$this->make_remote_request();

		if ( $this->response->ERROR ) {
			return $this->get_error_message();
		}

		// Subscribe contact to sequence
		$url  = $this->SUBSCRIBE_URL . '/objects/sequence';
		$args = array(
			'ids'      => $this->response->DATA['data']['attrs']['id'],
			'add_list' => $list_id,
			'objectID' => 0,
		);

		$this->prepare_request( $url, 'PUT', false, $args );

		return parent::subscribe( $args, $url );
	}
}
