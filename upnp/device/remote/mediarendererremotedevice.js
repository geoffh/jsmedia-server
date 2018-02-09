/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const HttpServer = require( '../../../util/httpserver' );
const RemoteDevice = require( './remotedevice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

const sRequiredServices = [
	ServiceTypes.AVTransport,
	ServiceTypes.ConnectionManager,
	ServiceTypes.RenderingControl
];

class MediaRendererRemoteDevice extends RemoteDevice {
	constructor( inDeviceObject ) {
		super( inDeviceObject, sRequiredServices );
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.remote.mediarendererremotedevice' );
		this.mLogger.debug( 'Creating remote MediaRenderer:' + this.getDeviceFriendlyName() );
	}
	
	connectionComplete( inConnectionID, inCallback ) {
		this.getConnectionManager().connectionComplete( inConnectionID, inCallback );
	}

	getAVTransport() { return this.getService( ServiceTypes.AVTransport ); }		
	getConnectionManager() { return this.getService( ServiceTypes.ConnectionManager ); }		
	getRenderingControl() { return this.getService( ServiceTypes.RenderingControl ); }
	
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
		
	getMute( inCallback ) {
		this.getRenderingControl().getMute( inCallback );
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
	
	getVolume( inCallback ) {
		this.getRenderingControl().getVolume( inCallback );
	}
	
	getVolumeDB( inCallback ) {
		this.getRenderingControl().getVolumeDB( inCallback );
	}
	
	getVolumeDBRange( inCallback ) {
		this.getRenderingControl().getVolumeDBRange( inCallback );
	}
	
	listPresets( inCallback ) {
		this.getRenderingControl().listPresets( inCallback );
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
	
	prepareForConnection( inRemoteProtocolInformation, inPeerConnectionManager, inPeerConnectionID, inDirection, inCallback ) {
		this.getConnectionManager().prepareForConnection( inRemoteProtocolInformation, inPeerConnectionManager, inPeerConnectionID, inDirection, inCallback );
	}
	
	previous( inCallback ) {
		this.getAVTransport().previous( inCallback );
	}
	
	seek( inUnit, inTarget, inCallback ) {
		this.getAVTransport().seek( inUnit, inTarget, inCallback );
	}
	
	selectPreset( inPresetName, inCallback ) {
		this.getRenderingControl().selectPreset( inPresetName, inCallback );
	}
	
	setAVTransportURI( inURI, inURIMetaData, inCallback ) {
		this.getAVTransport().setAVTransportURI( HttpServer.getDocumentURL( inURI ), inURIMetaData, inCallback );
	}
	
	setMute( inMute, inCallback ) {
		this.getRenderingControl().setMute( inMute, inCallback );
	}
	
	setVolume( inVolume, inCallback ) {
		this.getRenderingControl().setVolume( inVolume, inCallback );
	}
	
	setVolumeDB( inVolume, inCallback ) {
		this.getRenderingControl().setVolumeDB( inVolume, inCallback );
	}
	
	stop( inCallback ) {
		this.getAVTransport().stop( inCallback );
	}
}

module.exports = MediaRendererRemoteDevice;