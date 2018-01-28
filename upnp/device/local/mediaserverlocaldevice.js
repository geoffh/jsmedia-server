/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const LocalDevice = require( './localdevice' );
const AVTransportLocalService = require( './avtransportlocalservice' );
const ConnectionManagerLocalService = require( './connectionmanagerlocalservice' );
const ContentDirectoryLocalService = require( './contentdirectorylocalservice' );

const sDeviceOptions = {
		autoAdvertise: true,
		productName: 'geoff\'s Media Server',
		productVersion: '0',
		type: 'MediaServer',
		version: '1',
		friendlyName: 'geoff\'s Media Server',
		manufacturer: 'geoff Higgins',
		manufacturerURL: 'http://www.gph.com',
		modelName: 'geoff\'s Media Server',
		modelDescription: 'A Media Server courtesy of node.js',
		modelNumber: '0',
		modelURL: 'http://www.gph.com'
};

class MediaServerLocalDevice extends LocalDevice {
	constructor( inUPNPPeer, inLibrary ) {
	    super( inUPNPPeer, sDeviceOptions );
	    this.addService( new AVTransportLocalService() );
		this.addService( new ConnectionManagerLocalService( true, false ) );
		this.addService( new ContentDirectoryLocalService( inLibrary ) );
	}
}

module.exports = MediaServerLocalDevice;