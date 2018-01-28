/* jshint esversion: 6 */
var SearchTarget = SearchTarget || {};

SearchTarget.createAllSearchTarget = () => 'ssdp:all';
SearchTarget.createRootDevicesSearchTarget = () =>'upnp:rootdevice';
SearchTarget.createDeviceByUUIDSearchTarget = inUUID => 'uuid:' + inUUID;
SearchTarget.createDeviceByTypeSearchTarget = ( inDeviceType, inVersion ) => 'urn:schemas-upnp-org:device:' + inDeviceType + ':' + inVersion;
SearchTarget.createServiceByTypeSearchTarget = ( inServiceType, inVersion ) =>'urn:schemas-upnp-org:service:' + inServiceType + ':' + inVersion;
SearchTarget.createDeviceByDomainAndTypeSearchTarget = ( inDomain, inDeviceType, inVersion ) => 'urn:' + inDomain + ':device:' + inDeviceType + ':' + inVersion;
SearchTarget.createServiceByDomainAndTypeSearchTarget = ( inDomain, inServiceType, inVersion ) => 'urn:' + inDomain + ':service:' + inServiceType + ':' + inVersion;

module.exports = SearchTarget;