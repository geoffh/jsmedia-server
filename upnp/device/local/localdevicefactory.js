/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const MediaRendererLocalDevice = require( './mediarendererlocaldevice' );
const MediaServerLocalDevice = require( './mediaserverlocaldevice' );
const UPNPPeer = require( '../../peer' ).UPNPPeer;
const isUPNPPeerReady = require( '../../peer' ).isUPNPPeerReady;

const theLogger = require( 'log4js' ).getLogger( 'jsmedia.upnp.device.local.localdevicefactory' );

const createMediaRendererDevice = function() {
	if ( ! isUPNPPeerReady() ) {
		theLogger.debug( 'Waiting for UPNP Peer ...' );
		setTimeout( function() { createMediaRendererDevice(); }, 1000 );
		return;
	}
	return new MediaRendererLocalDevice( UPNPPeer );
};

const createMediaServerDevice = inLibrary => {
	if ( ! isUPNPPeerReady() ) {
		theLogger.debug( 'Waiting for UPNP Peer ...' );
		setTimeout( function() { createMediaServerDevice( inLibrary ); }, 1000 );
		return;
	}
	return new MediaServerLocalDevice( UPNPPeer, inLibrary );
};

exports.createMediaRendererDevice = createMediaRendererDevice;
exports.createMediaServerDevice = createMediaServerDevice;