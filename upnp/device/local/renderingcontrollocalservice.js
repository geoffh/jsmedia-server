/* jshint esversion: 6 */
const LocalService = require( './localservice' );

class RenderingControlLocalService extends LocalService {
	constructor() {
		super( 'RenderingControl', '1' );
		
		this.getMute = inArgs => {			
		};
		
		this.getVolume = inArgs => {			
		};
		
		this.getVolumeDB = inArgs => {			
		};
		
		this.getVolumeDBRange = inArgs => {			
		};
		
		this.listPresets = inArgs => {			
		};
		
		this.SelectPreset = inArgs => {			
		};
		
		this.SetMute = inArgs => {			
		};
		
		this.SetVolume = inArgs => {			
		};
		
		this.SetVolumeDB = inArgs => {			
		};
		
		this.addImplementations( this, {
			'GetMute': this.getMute,
			'GetVolume': this.getVolume,
			'GetVolumeDB': this.getVolumeDB,
			'GetVolumeDBRange': this.getVolumeDBRange,
			'ListPresets': this.listPresets,
			'SelectPreset': this.selectPreset,
			'SetMute': this.setMute,
			'SetVolume': this.setVolume,
			'SetVolumeDB': this.setVolumeDB
		} );
	
	    this.addAction( 'GetMute', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel' }, { CurrentMute: 'Mute' } );
	    this.addAction( 'GetVolume', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel' }, { CurrentVolume: 'Volume' } );
	    this.addAction( 'GetVolumeDB', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel' }, { CurrentVolume: 'VolumeDB' } );
	    this.addAction( 'GetVolumeDBRange', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel' }, { MinValue: 'VolumeDB', MaxValue: 'VolumeDB' } );
	    this.addAction( 'ListPresets', { InstanceID: 'A_ARG_TYPE_InstanceID' }, { CurrentPresetNameList: 'PresetNameList' } );
	    this.addAction( 'SelectPreset', { InstanceID: 'A_ARG_TYPE_InstanceID', PresetName: 'A_ARG_TYPE_PresetName' }, null );
	    this.addAction( 'SetMute', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel', DesiredMute: 'Mute' }, null );
	    this.addAction( 'SetVolume', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel', DesiredVolume: 'Volume' }, null );
	    this.addAction( 'SetVolumeDB', { InstanceID: 'A_ARG_TYPE_InstanceID', Channel: 'A_ARG_TYPE_Channel', DesiredVolume: 'VolumeDB' }, null );

	}
}

module.exports = RenderingControlLocalService;