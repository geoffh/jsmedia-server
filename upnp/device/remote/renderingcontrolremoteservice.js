/* jshint esversion: 6 */
const RemoteService = require( './remoteservice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

class RenderingControlRemoteService extends RemoteService {
	constructor( inServiceDescription, inServiceFunctions ) {
		super( ServiceTypes.RenderingControl, inServiceDescription.USN, inServiceFunctions );
	}
	
	/**
	 * Invokes GetMute( InstanceID = 0, Channel = 'Master' )
	 * @return boolean
	 */
	getMute( inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master'
		};
		this.execute( this.getServiceFunctions().GetMute, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetVolume( InstanceID = 0, Channel = 'Master' )
	 * return ui2 { min: '0', max: '32', step: '1' }
	 */
	getVolume( inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master'
		};
		this.execute( this.getServiceFunctions().GetVolume, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetVolumeDB( InstanceID = 0, Channel = 'Master' )
	 * return i2 { min: '-63', max: '0', step: '1' }
	 */
	getVolumeDB( inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master'
		};
		this.execute( this.getServiceFunctions().GetVolumeDB, theOptions, inCallback );
	}
	
	/**
	 * Invokes GetVolumeDBRange( InstanceID = 0, Channel = 'Master' )
	 * return [ MinValue: 'VolumeDB', MaxValue: 'VolumeDB' ]
	 *        VolumeDB is i2 { min: '-63', max: '0', step: '1' }
	 */
	getVolumeDBRange( inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master'
		};
		this.execute( this.getServiceFunctions().GetVolumeDBRange, theOptions, inCallback );
	}
	
	/**
	 * Invokes ListPresets( InstanceID = 0 )
	 * @return string
	 */
	listPresets( inCallback ) {
		const theOptions = {
			InstanceID: 0
		};
		this.execute( this.getServiceFunctions().ListPresets, theOptions, inCallback );
	}
	
	/**
	 * Invokes SelectPreset( InstanceID = 0, PresetName = inPresetName )
	 * @param inPresetName string
	 */
	selectPreset( inPresetName, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			PresetName: inPresetName
		};
		this.execute( this.getServiceFunctions().SelectPreset, theOptions, inCallback );
	}
	
	/**
	 * Invokes SetMute( InstanceID = 0, Channel = 'Master' DesiredMute = inMute )
	 * @param inMute boolean
	 */
	setMute( inMute, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master',
			DesiredMute: inMute
		};
		this.execute( this.getServiceFunctions().SetMute, theOptions, inCallback );
	}
	
	/**
	 * Invokes SetVolume( InstanceID = 0, Channel = 'Master', DesiredVolume = inVolume )
	 * @param inVolume ui2 { min: '0', max: '32', step: '1' }
	 */
	setVolume( inVolume, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master',
			DesiredVolume: inVolume
		};
		this.execute( this.getServiceFunctions().SetVolume, theOptions, inCallback );
	}
	
	/**
	 * Invokes SetVolume( InstanceID = 0, Channel = 'Master', DesiredVolume = inVolume )
	 * @param inVolume i2 { min: '-63', max: '0', step: '1' }
	 */
	setVolumeDB( inVolume, inCallback ) {
		const theOptions = {
			InstanceID: 0,
			Channel: 'Master',
			DesiredVolume: inVolume
		};
		this.execute( this.getServiceFunctions().SetVolumeDB, theOptions, inCallback );
	}
}

module.exports = RenderingControlRemoteService;