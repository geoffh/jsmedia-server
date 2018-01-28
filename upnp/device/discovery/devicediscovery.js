/* jshint esversion: 6 */
const http = require( 'http' );
const log4js = require( 'log4js' );

const UPNPPeer = require( '../../peer' ).UPNPPeer;
const isUPNPPeerReady = require( '../../peer' ).isUPNPPeerReady;

class DeviceDiscovery {
	constructor() {
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.discovery.devicediscovery' );
		this.mUPNPPeer = UPNPPeer;
		
		this.onSearchTargetFound = function( inSearchTarget, inCallback, inDeviceOrService ) {
			this.mLogger.debug( 'Search Target found:' + ( inDeviceOrService.USN ? inDeviceOrService.USN : inDeviceOrService.UDN ) );
			inDeviceOrService.bind( function( inBoundDeviceOrService ) {
				inCallback( inSearchTarget, inDeviceOrService, inBoundDeviceOrService );
			} );
		};
	}
	
	discover( inSearchTargets, inCallback ) {
		if ( ! isUPNPPeerReady() ) {
			this.mLogger.debug( 'Waiting for UPNP Peer ...' );
			const theDeviceManager = this;
			setTimeout( function() { theDeviceManager.discover( inSearchTargets, inCallback ); }, 1000 );
			return;
		}
		this.mLogger.debug( 'Discovering targets:' + inSearchTargets );
		inSearchTargets.forEach( function( inSearchTarget, inIndex, inSearchTargets ){
			this.mUPNPPeer.on( inSearchTarget, this.onSearchTargetFound.bind( this, inSearchTarget, inCallback ) );
		}, this );		
	}
}

module.exports = DeviceDiscovery;