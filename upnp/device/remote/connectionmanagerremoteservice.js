/* jshint esversion: 6 */
const RemoteService = require( './remoteservice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

class ConnectionManagerRemoteService extends RemoteService {
	constructor( inServiceDescription, inServiceFunctions ) {
		super( ServiceTypes.ConnectionManager, inServiceDescription.USN, inServiceFunctions );
	}
	
	connectionComplete( inConnectionID, inCallback ) {
		const theOptions = { ConnectionID: inConnectionID };
		this.execute( this.getServiceFunctions().ConnectionComplete, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetCurrentConnectionIDs( ConnectionID = inConnectionID )
	 * @param inConnectionID string
	 * @return [
	 *           RcsID: 'A_ARG_TYPE_RcsID',
     *           AVTransportID: 'A_ARG_TYPE_AVTransportID',
     *           ProtocolInfo: 'A_ARG_TYPE_ProtocolInfo',
     *           PeerConnectionManager: 'A_ARG_TYPE_ConnectionManager',
     *           PeerConnectionID: 'A_ARG_TYPE_ConnectionID',
     *           Direction: 'A_ARG_TYPE_Direction',
     *           Status: 'A_ARG_TYPE_ConnectionStatus'
     *          ]
	 */
	getCurrentConnectionInfo( inConnectionID, inCallback ) {
		const theOptions = { ConnectionID: inConnectionID };
		this.execute( this.getServiceFunctions().GetCurrentConnectionInfo, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetCurrentConnectionIDs()
	 * @return string
	 */
	getCurrentConnectionIDs( inCallback ) {
		this.execute( this.getServiceFunctions().GetCurrentConnectionIDs, null, inCallback );
	}
	
	/**
	 * Invokes GetProtocolInfo()
	 * @return [Sink : string, Source : string]
	 */
	getProtocolInfo( inCallback ) {
		this.execute( this.getServiceFunctions().GetProtocolInfo, null, inCallback );
	}
	
	prepareForConnection( inRemoteProtocolInformation, inPeerConnectionManager, inPeerConnectionID, inDirection, inCallback ) {
		const theOptions = {
			RemoteProtocolInformation: inRemoteProtocolInformation,
			PeerConnectionManager: inPeerConnectionManager,
			PeerConnectionID: inPeerConnectionID,
			Direction: inDirection
		};
		this.execute( this.getServiceFunctions().PrepareForConnection, null, inCallback );
	}
}

module.exports = ConnectionManagerRemoteService;