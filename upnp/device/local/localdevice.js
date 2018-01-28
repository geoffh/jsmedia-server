/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const uuid = require( 'uuid' );

class LocalDevice {
	constructor( inUPNPPeer, inDeviceOptions ) {
		inDeviceOptions.domain = "schemas-upnp-org";
		inDeviceOptions.uuid = uuid.v1();
		inDeviceOptions.serialNumber = uuid.v1();
		inDeviceOptions.UPC = uuid.v1();
		this.mDevice = inUPNPPeer.createDevice( inDeviceOptions );
		
		this.addService = function( inLocalService ) {		
			const theServiceObject = this.mDevice.createService( inLocalService.getOptions() );
			inLocalService.setServiceObject( theServiceObject );
		};
	}
}

module.exports = LocalDevice;