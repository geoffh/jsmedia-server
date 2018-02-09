/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const RemoteDevice = require( './remotedevice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

const sRequiredServices = [
	ServiceTypes.AVTransport,
	ServiceTypes.ConnectionManager,
	ServiceTypes.ContentDirectory
];

class MediaServerRemoteDevice extends RemoteDevice {
	constructor( inDeviceObject ) {
		super( inDeviceObject, sRequiredServices );
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.remote.mediaserverremotedevice' );
		this.mLogger.debug( 'Creating remote MediaServer:' + this.getDeviceFriendlyName() );
	}

	getAVTransport() { return this.getService( ServiceTypes.AVTransport ); }		
	getConnectionManager() { return this.getService( ServiceTypes.ConnectionManager ); }		
	getContentDirectory() { return this.getService( ServiceTypes.ContentDirectory ); }
	
	getCurrentConnectionIDs( inCallback ) {
		this.getConnectionManager().getCurrentConnectionIDs( inCallback );
	}
	
	getCurrentConnectionInfo( inConnectionID, inCallback ) {
		this.getConnectionManager().getCurrentConnectionInfo( inConnectionID, inCallback );
	}
	
	getCurrentTransportActions( inCallback ) {
		this.getAVTransport().getCurrentTransportActions( inCallback );
	}
	
	getDeviceCapabilities( inCallback ) {
		this.getAVTransport().getDeviceCapabilities( inCallback );
	}
	
	getMediaInfo( inCallback ) {
		this.getAVTransport().getMediaInfo( inCallback );
	}
	
	getPositionInfo( inCallback ) {
		this.getAVTransport().getPositionInfo( inCallback );
	}
	
	getProtocolInfo( inCallback ) {
		this.getConnectionManager().getProtocolInfo( inCallback );
	}
	
	getTransportInfo( inCallback ) {
		this.getAVTransport().getTransportInfo( inCallback );
	}
	
	getTransportSettings( inCallback ) {
		this.getAVTransport().getTransportSettings( inCallback );
	}
	
	next( inCallback ) {
		this.getAVTransport().next( inCallback );
	}
	
	pause( inCallback ) {
		this.getAVTransport().pause( inCallback );
	}
	
	play( inSpeed, inCallback ) {
		this.getAVTransport().play( inSpeed, inCallback );
	}
	
	previous( inCallback ) {
		this.getAVTransport().previous( inCallback );
	}
	
	seek( inUnit, inTarget, inCallback ) {
		this.getAVTransport().seek( inUnit, inTarget, inCallback );
	}
	
	setAVTransportURI( inURI, inURIMetaData, inCallback ) {
		this.getAVTransport().setAVTransportURI( inURI, inURIMetaData, inCallback );
	}
	
	stop( inCallback ) {
		this.getAVTransport().stop( inCallback );
	}
}

module.exports = MediaServerRemoteDevice;