/* jshint esversion: 6 */
const theLogger = require( 'log4js' ).getLogger( 'jsmedia.upnp.device.remote.remotedevicefactory' );

const DeviceTypes = require( '../devicetypes' ).DeviceTypes;
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;
const MediaRendererRemoteDevice = require( './mediarendererremotedevice' );
const MediaServerRemoteDevice = require( './mediaserverremotedevice' );
const AVTransportRemoteService = require( './avtransportremoteservice' );
const ConnectionManagerRemoteService = require( './connectionmanagerremoteservice' );
const ContentDirectoryRemoteService = require( './contentdirectoryremoteservice' );
const RenderingControlRemoteService = require( './renderingcontrolremoteservice' );

const createRemoteDevice = function( inDeviceObject ) {
	let theRemoteDevice = null;
	if ( inDeviceObject.deviceType === DeviceTypes.MediaRenderer ) {
		theRemoteDevice = new MediaRendererRemoteDevice( inDeviceObject );
	} else if ( inDeviceObject.deviceType === DeviceTypes.MediaServer ) {
		theRemoteDevice = new MediaServerRemoteDevice( inDeviceObject );
	} else {
		theLogger.debug( 'Unhandled device type:' + inDeviceObject.deviceType );
	}
	return theRemoteDevice;
};

const createRemoteService = function( inServiceDescription, inServiceFunctions ) {
	let theRemoteService = null;
	const theServiceType = inServiceDescription.serviceType;
	if ( theServiceType === ServiceTypes.AVTransport ) {
		theRemoteService = new AVTransportRemoteService( inServiceDescription, inServiceFunctions );
	} else if ( theServiceType === ServiceTypes.ConnectionManager ) {
		theRemoteService = new ConnectionManagerRemoteService( inServiceDescription, inServiceFunctions );
	} else if ( theServiceType === ServiceTypes.ContentDirectory ) {
		theRemoteService = new ContentDirectoryRemoteService( inServiceDescription, inServiceFunctions );
	} else if ( theServiceType === ServiceTypes.RenderingControl ) {
		theRemoteService = new RenderingControlRemoteService( inServiceDescription, inServiceFunctions );
	} else {
		theLogger.debug( 'Unhandled service type:' + theServiceType );
	}
	return theRemoteService;
};

exports.createRemoteDevice = createRemoteDevice;
exports.createRemoteService = createRemoteService;