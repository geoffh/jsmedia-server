/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const LocalService = require( './localservice' );

class AVTransportLocalService extends LocalService {
	constructor() {
		super( 'AVTransport', '1' );
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.local.AVTransportLocalService' );

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

	getCurrentTransportActions( inArgs ) {
		return { Actions: 'Some Actions' };
	}
		
	getDeviceCapabilities( inArgs ) {
		this.mLogger.debug( 'getDeviceCapabilities' );
	}
	
	getMediaInfo( inArgs ) {
		this.mLogger.debug( 'getMediaInfo' );
	}

	getPositionInfo( inArgs ) {
		this.mLogger.debug( 'getPositionInfo' );
	}

	getTransportInfo( inArgs ) {
		this.mLogger.debug( 'getTransportInfo' );
	}

	getTransportSettings( inArgs ) {
		this.mLogger.debug( 'getTransportSettings' );
	}
	
	next( inArgs ) {
		this.mLogger.debug( 'next' );
	}
	
	pause( inArgs ) {
		this.mLogger.debug( 'pause' );
	}
	
	play( inArgs ) {
		this.mLogger.debug( 'play' );
	}
	
	previous( inArgs ) {
		this.mLogger.debug( 'previous' );
	}
	
	seek( inArgs ) {
		this.mLogger.debug( 'seek' );		
	}
	
	setAVTransportURI( inArgs ) {
		this.mLogger.debug( 'setAVTransportURI' );
	}
	
	stop( inArgs ) {
		this.mLogger.debug( 'stop' );			
	}
}

module.exports = AVTransportLocalService;