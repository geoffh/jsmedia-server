/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const util = require( 'util' );

class RemoteDevice {	
	constructor( inDeviceObject, inRequiredServices ) {
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.remote.remotedevice' );
		this.mLogger.debug( 'Creating remote device: UDN:' + inDeviceObject.UDN + ' Type:' + inDeviceObject.deviceType );
		
		this.onDeviceDisappear = function( inDeviceObject ) {
			this.mLogger.debug( 'Device disappeared:' + this.mServiceType );
		};

		this.mDeviceObject = inDeviceObject;
		this.mRequiredServices = inRequiredServices;
		this.mServices = new Map();
		this.mDeviceObject.on( 'disappear', this.onDeviceDisappear.bind( this ) );
		
		this.getDeviceObject = function() {
			return this.mDeviceObject;
		};
		
		this.getService = function( inServiceType ) {
			return this.mServices.get( inServiceType );
		};
		
		this.getServices = function() {
			return this.mServices;
		};
		
		this.hasRequiredServices = function() {
			if ( ! this.mRequiredServices ) {
				return true;
			}
			for ( let theIndex = 0; theIndex < this.mRequiredServices.length; theIndex ++ ) {
				const theService = this.getService( this.mRequiredServices[ theIndex ] );
				if ( ! theService || ! theService.isReady() ) {
					return false;
				}
			}
			return true;
		};
		
		this.onServiceDisappear = function( inServiceObject ) {
			this.mLogger.debug( 'Service disappeared:' + inServiceObject );
		};
	}
	
	addService( inService ) {
		const theServiceType = inService.getServiceType();
		const theServiceDescription = this.getDeviceObject().services[ theServiceType ];
		if ( theServiceDescription ) {
			inService.setServiceDescription( theServiceDescription );
			this.mServices.set( theServiceType, inService );
			this.mLogger.debug( 'Service \'' + inService.getServiceUSN() + '\' added to device \'' + this.getDeviceType() + '\'' );
		}
	}	
	
	getDeviceFriendlyName() {
		return this.mDeviceObject.friendlyName;
	}
	
	getDeviceUDN() {
		return this.getDeviceObject().UDN;
	}
	
	getDeviceType() {
		return this.getDeviceObject().deviceType;
	}
	
	hasAction( inServiceType, inActionName ) {
		const theService = this.getService( inServiceType );
		return theService ? theService.hasAction( inActionName ) : false;
	}
	
	isReady() {
		return this.hasRequiredServices();
	}
	
	update( inDeviceObject ) {
		for ( let theServiceType in inDeviceObject.services ) {
			if ( inDeviceObject.services.hasOwnProperty( theServiceType ) ) {
				const theService = this.getService( theServiceType );
				if ( theService ) {
					theService.setServiceDescription( inDeviceObject.services[ theServiceType ] );
				}
			}
		}
		
	}
}

module.exports = RemoteDevice;