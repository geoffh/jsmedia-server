/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const LocalService = require( './localservice' );

const sSourceProtocolInfo = 'SourceProtocolInfo';
const sSinkProtocolInfo = 'SinkProtocolInfo';
const sCurrentConnectionIDs = 'CurrentConnectionIDs';
const sConnectionStatus = 'A_ARG_TYPE_ConnectionStatus';
const sConnectionManager = 'A_ARG_TYPE_ConnectionManager';
const sDirection = 'A_ARG_TYPE_Direction';
const sProtocolInfo = 'A_ARG_TYPE_ProtocolInfo';
const sConnectionID = 'A_ARG_TYPE_ConnectionID';
const sAVTransportID = 'A_ARG_TYPE_AVTransportID';
const sRcsID = 'A_ARG_TYPE_RcsID';

const sProtocolInfoValue = 'http-get:*:audio/mpeg:*,http-get:*:audio/mpeg3:*,http-get:*:audio/mp3:*';

class ConnectionManagerLocalService extends LocalService {
	constructor( inIsSource, inIsSink ) {
		super( 'ConnectionManager', '1' );
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.local.ConnectionManagerLocalService' );
		this.set( sSourceProtocolInfo, inIsSource ? sProtocolInfoValue : '' );
		this.set( sSinkProtocolInfo, inIsSink ? sProtocolInfoValue : '' );	
		this.set( sCurrentConnectionIDs, null );
		
		/*
		 * Optional
		 * 
		this.connectionComplete = function( inArgs ) {};		
		this.prepareForConnection = function( inArgs ) {};
		 */
		
		this.addImplementations( this, {
			'GetCurrentConnectionInfo': this.getCurrentConnectionInfo,			
			'GetCurrentConnectionIDs': this.getCurrentConnectionIDs,
			'GetProtocolInfo': this.getProtocolInfo,
			/*
			 * Optional
			 * 
			'ConnectionComplete': this.connectionComplete,
			'PrepareForConnection': this.prepareForConnection
			 */
		} );

		
		this.addAction( 'GetCurrentConnectionInfo', 
				        { ConnectionID: sConnectionID },
				        { RcsID: sRcsID,
				          AVTransportID: sAVTransportID,
				          ProtocolInfo: sProtocolInfo,
				          PeerConnectionManager: sConnectionManager,
				          PeerConnectionID: sConnectionID,
				          Direction: sDirection,
				          Status: sConnectionStatus } );
		this.addAction( 'GetCurrentConnectionIDs', null, { ConnectionIDs: sCurrentConnectionIDs } );
		this.addAction( 'GetProtocolInfo', null, { Sink: sSinkProtocolInfo, Source: sSourceProtocolInfo } );
		/*
		 * Optional
		 * 
		this.addAction( 'ConnectionComplete', { ConnectionID: sConnectionID }, null );
		this.addAction( 'PrepareForConnection',
				        { RemoteProtocolInfo: sProtocolInfo,
			              PeerConnectionManager: sConnectionManager,
			              PeerConnectionID, sConnectionID,
			              Direction, sDirection },
			            { ConnectionID: sConnectionID,
			              AVTransportID: sAVTransportID,
			              RcsID: sRcsID } );
		*/
		
		this.addVariables( {
			sSourceProtocolInfo: 'string',
			sSinkProtocolInfo: 'string',
			sConnectionStatus: 'string',
			sConnectionmanager: 'string',
			sDirection: 'string',
			sProtocolInfo: 'string',
			sConnectionID: 'i4',
			sAVTransportID: 'i4',
			sRcsID: 'i4'			
		} );
	}

	getCurrentConnectionInfo( inArgs ) {
			this.mLogger.debug( 'getCurrentConnectionInfo' );
			return {
				RcsID: 'A',
				AVTransportID: 'B',
				ProtocolInfo: 'C',
				PeerConnectionManager: 'D',
				PeerConnectionID: 'E',
				Direction: 'F',
				Status: 'G'
			};
		};
		
	getCurrentConnectionIDs() {
		this.mLogger.debug( 'getCurrentConnectionIDs' );
		return { ConnectionIDs: this.get( sCurrentConnectionIDs ) };
	}
		
	getProtocolInfo() {
		this.mLogger.debug( 'getProtocolInfo' );
		return { Source: this.get( sSourceProtocolInfo), Sink: this.get( sSinkProtocolInfo ) };
	}
}

module.exports = ConnectionManagerLocalService;