/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const UPnPError = require( 'peer-upnp' ).UPnPError;

class RemoteService {
	constructor( inServiceType, inServiceUSN, inServiceFunctions ) {
		this.mServiceType = inServiceType;
		this.mServiceUSN = inServiceUSN;		
		this.mServiceDescription = null;
		this.mServiceFunctions = inServiceFunctions;
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.remote.remoteservice' );
		
		this.execute = ( inFunction, inOptions, inCallback ) => {
			const theService = this;
			inFunction( inOptions, function( inResult ) {
				theService.returnResult( inResult, inCallback );
			} );
		};
		
		this.getServiceDescription = () => this.mServiceDescription;
		
		this.getServiceFunctions = () => this.mServiceFunctions;
		
		this.onEvent = inData => {
			this.mLogger.debug( 'onEvent:' + inData );
		};
		
		this.returnResult = ( inResult, inCallback ) => {
			if ( inResult instanceof UPnPError ) {
				inCallback( null, inResult );
			} else {
				inCallback( inResult );
			}
		};
	}
	
	getServiceType() {
		return this.mServiceType;
	}
	
	getServiceUSN() {
		return this.mServiceUSN;
	}
	
	hasAction( inActionName ) {
		const theActions = this.mServiceObject.SCPD.actionList.action;
		for ( let theIndex = 0; theIndex < theActions.length; theIndex ++ ) {
			if ( theActions[ theIndex ].name === inActionName ) {
				return true;
			}
		}
		return false;
	}
	
	isReady() {
		return this.getServiceDescription() && this.getServiceFunctions();
	}
	
	setServiceDescription( inServiceDescription ) {
		this.mServiceDescription = inServiceDescription;
		const theService = this;
		this.getServiceDescription().on( 'event', this.onEvent.bind( this ) );
	}
}

module.exports = RemoteService;