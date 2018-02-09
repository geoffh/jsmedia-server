/* jshint esversion: 6 */
const DeviceDiscovery = require( './device/discovery/devicediscovery' );
const DeviceTypes = require( './device/devicetypes' ).DeviceTypes;
const RemoteDeviceFactory = require( './device/remote/remotedevicefactory' );
const ServiceTypes = require( './device/devicetypes' ).ServiceTypes;

class Devices {
    constructor() {
        this.mediaRenderers = new Map();
        this.mediaServers = new Map();
        this.startDiscovery();
    }

    getExistingDevice( inUDN ) {
        return this.mediaRenderers.get( inUDN ) || this.mediaServers.get( inUDN );
    }

    getMediaRenderers() {
        return Array.from( this.mediaRenderers.values() );
    }

    getMediaServers() {
        return Array.from( this.mediaServers.values() );
    }

    play( inMediaRendererId, inTrackUri ) {
        const theMediaRenderer = this.mediaRenderers.get( inMediaRendererId );
        theMediaRenderer.setAVTransportURI( inTrackUri );
        theMediaRenderer.play( null, null );
    }

    setDevice( inDevice ) {
        const theDeviceType = inDevice.getDeviceType();
        if ( DeviceTypes.MediaRenderer === theDeviceType ) {
            this.mediaRenderers.set( inDevice.getDeviceUDN(), inDevice );
        } else if ( DeviceTypes.MediaServer === theDeviceType ) {
            this.mediaServers.set( inDevice.getDeviceUDN(), inDevice );
        }
    }

    startDiscovery() {
        const theSearchTargets = [
            ServiceTypes.RenderingControl,
            ServiceTypes.ConnectionManager,
            ServiceTypes.ContentDirectory,
            ServiceTypes.AVTransport,
            DeviceTypes.MediaRenderer,
            DeviceTypes.MediaServer
        ];
        new DeviceDiscovery().discover( theSearchTargets, ( inSearchTarget, inDeviceOrServiceDescription, inBoundDeviceOrService ) => {
            let theDevice;
            if ( inDeviceOrServiceDescription.USN ) {
                theDevice = this.getExistingDevice( inDeviceOrServiceDescription.device.UDN );
                if ( ! theDevice ) {
                    theDevice = RemoteDeviceFactory.createRemoteDevice( inDeviceOrServiceDescription.device );
                    if ( theDevice ) {
                        this.setDevice( theDevice );
                    }
                }
                if ( theDevice ) {
                    const theService = RemoteDeviceFactory.createRemoteService( inDeviceOrServiceDescription, inBoundDeviceOrService );
                    theDevice.addService( theService );
                }
            } else {		
                theDevice = this.getExistingDevice( inBoundDeviceOrService.UDN );
                if ( ! theDevice ) {
                    theDevice = RemoteDeviceFactory.createRemoteDevice( inBoundDeviceOrService );
                    this.setDevice( theDevice );
                } else {
                    theDevice.update( inBoundDeviceOrService );
                }
            }
        } );
    }
}

module.exports = new Devices();