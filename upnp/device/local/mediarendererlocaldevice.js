/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const LocalDevice = require( './localdevice' );
const AVTransportLocalService = require( './avtransportlocalservice' );
const ConnectionManagerLocalService = require( './connectionmanagerlocalservice' );
const RenderingControlLocalService = require( './renderingcontrollocalservice' );

const sDeviceOptions = {
		autoAdvertise: true,
		productName: "Not really a product",
		productVersion: "0",
		type: "MediaRenderer",
		version: "1",
		friendlyName: "My MediaRenderer",
		manufacturer: "gPh",
		manufacturerURL: "http://www.gph.com",
		modelName: "My MediaRenderer",
		modelDescription: "A MediaRenderer",
		modelNumber: "0",
		modelURL: "http://www.gph.com"
};

class MediaRendererLocalDevice extends LocalDevice {
	constructor( inUPNPPeer ) {
	    super( inUPNPPeer, sDeviceOptions );	    
	    this.addService( new AVTransportLocalService() );
		this.addService( new ConnectionManagerLocalService( false, true ) );
		this.addService( new RenderingControlLocalService() );
	}
}

module.exports = MediaRendererLocalDevice;