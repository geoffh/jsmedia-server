/* jshint esversion: 6 */

const RemoteService = require( './remoteservice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

const sOptionsInstanceID = {
	InstanceID: 0
};

class AVTransportRemoteService extends RemoteService {
	constructor( inServiceDescription, inServiceFunctions ) {
		super( ServiceTypes.AVTransport, inServiceDescription.USN, inServiceFunctions );
	}
	
	/**
	 * Invokes GetCurrentTransportActions( InstanceID = 0 )
	 * @return string
	 */
	getCurrentTransportActions( inCallback ) {
		this.execute( this.getServiceFunctions().GetCurrentTransportActions, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes GetDeviceCapabilities( InstanceID = 0 )
	 * @return [
	 *          PlayMedia: 'PossiblePlaybackStorageMedia',
     *          RecMedia: 'PossibleRecordStorageMedia',
     *          RecQualityModes: 'PossibleRecordQualityModes'
	 *         ]
	 */
	getDeviceCapabilities( inCallback ) {
		this.execute( this.getServiceFunctions().GetDeviceCapabilities, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes GetMediaInfo( InstanceID = 0 )
	 * @return [
	 *          NrTracks: 'NumberOfTracks',
     *          MediaDuration: 'CurrentMediaDuration',
     *          CurrentURI: 'AVTransportURI',
     *          CurrentURIMetaData: 'AVTransportURIMetaData',
     *          NextURI: 'NextAVTransportURI',
     *          NextURIMetaData: 'NextAVTransportURIMetaData',
     *          PlayMedium: 'PlaybackStorageMedium',
     *          RecordMedium: 'RecordStorageMedium',
     *          WriteStatus: 'RecordMediumWriteStatus'
	 *         ]
	 */
	getMediaInfo( inCallback ) {
		this.execute( this.getServiceFunctions().GetMediaInfo, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes GetTransportInfo( InstanceID = 0 )
	 * @return [
	 *          Track: 'CurrentTrack',
     *          TrackDuration: 'CurrentTrackDuration',
     *          TrackMetaData: 'CurrentTrackMetaData',
     *          TrackURI: 'CurrentTrackURI',
     *          RelTime: 'RelativeTimePosition',
     *          AbsTime: 'AbsoluteTimePosition',
     *          RelCount: 'RelativeCounterPosition',
     *          AbsCount: 'AbsoluteCounterPosition'
	 *         ]
	 */
	getPositionInfo( inCallback ) {
		this.execute( this.getServiceFunctions().GetPositionInfo, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes GetTransportInfo( InstanceID = 0 )
	 * @return [
	 *          CurrentTransportState: 'TransportState',
     *          CurrentTransportStatus: 'TransportStatus',
     *          CurrentSpeed: 'TransportPlaySpeed'
	 *         ]
	 */
	getTransportInfo( inCallback ) {
		this.execute( this.getServiceFunctions().GetTransportInfo, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes GetTransportSettings( InstanceID = 0 )
	 * @return [
	 *          PlayMode: 'CurrentPlayMode',
     *          RecQualityMode: 'CurrentRecordQualityMode'
	 *         ]
	 */
	getTransportSettings( inCallback ) {
		this.execute( this.getServiceFunctions().GetTransportSettings, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes Next( InstanceID = 0 )
	 */
	next( inCallback ) {
		this.execute( this.getServiceFunctions().Next, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes Pause( InstanceID = 0 )
	 */
	pause( inCallback ) {
		this.execute( this.getServiceFunctions().Pause, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes Play( InstanceID = 0, Speed = inSpeed )
	 * @param inSpeed string
	 */
	play( inSpeed, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Speed: inSpeed
		};
		this.execute( this.getServiceFunctions().Play, theOptions, inCallback );
	}
	
	/**
	 * Invokes Previous( InstanceID = 0 )
	 */
	previous( inCallback ) {
		this.execute( this.getServiceFunctions().Previous, sOptionsInstanceID, inCallback );
	}
	
	/**
	 * Invokes Seek( InstanceID = 0, Unit = inUnit, Target = inTarget )
	 * @param inUnit string [ 'TRACK_NR', 'ABS_TIME' ]
	 * @param inTarget string
	 */
	seek( inUnit, inTarget, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Unit: inUnit,
			Target: inTarget
		};
		this.execute( this.getServiceFunctions().Seek, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetCurrentTransportActions( InstanceID = 0 )
	 * @param inURI string
	 * @param inURIMetaData string
	 */
	setAVTransportURI( inURI, inURIMetaData, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			CurrentURI: inURI,
			CurrentURIMetaData: inURIMetaData
		};
		this.execute( this.getServiceFunctions().SetAVTransportURI, theOptions, inCallback );
	}
	
	/**
	 * Invokes Stop( InstanceID = 0 
	 */
	stop( inCallback ) {
		this.execute( this.getServiceFunctions().Stop, sOptionsInstanceID, inCallback );
	}
}

module.exports = AVTransportRemoteService;