/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const LocalService = require( './localservice' );

class AVTransportLocalService extends LocalService {
	constructor() {
		super( 'AVTransport', '1' );
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.local.AVTransportLocalService' );
		
		this.getCurrentTransportActions = inArgs =>	{ Actions: 'Some Actions' };
		
		this.getDeviceCapabilities = function( inArgs ) {
			this.mLogger.debug( 'getDeviceCapabilities' );
		};
		
		this.getMediaInfo = function( inArgs ) {
			this.mLogger.debug( 'getMediaInfo' );
		};

		this.getPositionInfo = function( inArgs ) {
			this.mLogger.debug( 'getPositionInfo' );
		};

		this.getTransportInfo = function( inArgs ) {
			this.mLogger.debug( 'getTransportInfo' );
		};

		this.getTransportSettings = function( inArgs ) {
			this.mLogger.debug( 'getTransportSettings' );
		};
		
		this.next = function( inArgs ) {
			this.mLogger.debug( 'next' );
		};
		
		this.pause = function( inArgs ) {
			this.mLogger.debug( 'pause' );
		};
		
		this.play = function( inArgs ) {
			this.mLogger.debug( 'play' );
		};
		
		this.previous = function( inArgs ) {
			this.mLogger.debug( 'previous' );
		};
		
		this.seek = function( inArgs ) {
			this.mLogger.debug( 'seek' );		
		};
		
		this.setAVTransportURI = function( inArgs ) {
			this.mLogger.debug( 'setAVTransportURI' );
		};
		
		this.stop = function( inArgs ) {
			this.mLogger.debug( 'stop' );			
		};
		
		this.addImplementations( this, {
			'GetCurrentTransportActions': this.getCurrentTransportActions,
			'GetDeviceCapabilities': this.getDeviceCapabilities,
			'GetMediaInfo': this.getMediaInfo,
			'GetPositionInfo': this.getPositionInfo,
			'GetTransportInfo': this.getTransportInfo,
			'GetTransportSettings': this.getTransportSettings,
			'Next': this.next,
			'Pause': this.pause,
			'Play': this.play,
			'Previous': this.previous,
			'Seek': this.seek,
			'SetAVTransportURI': this.setAVTransportURI,
			'Stop': this.stop
		} );
		
		this.addAction( 'GetCurrentTransportActions', { InstanceID: 'A_ARG_TYPE_InstanceID' }, { Actions: 'CurrentTransportActions' } );
		this.addAction( 'GetDeviceCapabilities',
				        { InstanceID: 'A_ARG_TYPE_InstanceID' }, 
				        { PlayMedia: 'PossiblePlaybackStorageMedia',
	                      RecMedia: 'PossibleRecordStorageMedia',
	                      RecQualityModes: 'PossibleRecordQualityModes' } );
		this.addAction( 'GetMediaInfo',
				        { InstanceID: 'A_ARG_TYPE_InstanceID' }, 
				        { NrTracks: 'NumberOfTracks',
				          MediaDuration: 'CurrentMediaDuration',
				          CurrentURI: 'AVTransportURI',
				          CurrentURIMetaData: 'AVTransportURIMetaData',
				          NextURI: 'NextAVTransportURI',
				          NextURIMetaData: 'NextAVTransportURIMetaData',
				          PlayMedium: 'PlaybackStorageMedium',
				          RecordMedium: 'RecordStorageMedium',
				          WriteStatus: 'RecordMediumWriteStatus' } );
		this.addAction( 'GetPositionInfo',
				        { InstanceID: 'A_ARG_TYPE_InstanceID' },
				        { Track: 'CurrentTrack',
				          TrackDuration: 'CurrentTrackDuration',
				          TrackMetaData: 'CurrentTrackMetaData',
				          TrackURI: 'CurrentTrackURI',
				          RelTime: 'RelativeTimePosition',
				          AbsTime: 'AbsoluteTimePosition',
				          RelCount: 'RelativeCounterPosition',
				          AbsCount: 'AbsoluteCounterPosition' } );
		this.addAction( 'GetTransportInfo',
				        { InstanceID: 'A_ARG_TYPE_InstanceID' },
				        { CurrentTransportState: 'TransportState',
				          CurrentTransportStatus: 'TransportStatus',
				          CurrentSpeed: 'TransportPlaySpeed' } );
		this.addAction( 'GetTransportSettings',
				        { InstanceID: 'A_ARG_TYPE_InstanceID' },
				        { PlayMode: 'CurrentPlayMode',
				          RecQualityMode: 'CurrentRecordQualityMode' } );
		this.addAction( 'Next', { InstanceID: 'A_ARG_TYPE_InstanceID' }, null );
		this.addAction( 'Pause', { InstanceID: 'A_ARG_TYPE_InstanceID' }, null );
		this.addAction( 'Play', { InstanceID: 'A_ARG_TYPE_InstanceID', Speed: 'TransportPlaySpeed' }, null );
		this.addAction( 'Previous', { InstanceID: 'A_ARG_TYPE_InstanceID' }, null );
		this.addAction( 'Seek', 
				        { InstanceID: 'A_ARG_TYPE_InstanceID',
	                      Unit: 'A_ARG_TYPE_SeekMode',
	                      Target: 'A_ARG_TYPE_SeekTarget' }, 
	                    null );
		this.addAction( 'SetAVTransportURI',
				        { InstanceID: 'A_ARG_TYPE_InstanceID',
	                      CurrentURI: 'AVTransportURI',
	                      CurrentURIMetaData: 'AVTransportURIMetaData' },
	                    null );
		this.addAction( 'Stop', { InstanceID: 'A_ARG_TYPE_InstanceID', Speed: 'TransportPlaySpeed' }, null );
	}
}

module.exports = AVTransportLocalService;