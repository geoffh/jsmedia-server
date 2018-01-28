/* jshint esversion: 6 */
var DeviceTypes = DeviceTypes || {};

DeviceTypes.MediaServer = 'urn:schemas-upnp-org:device:MediaServer:1';
DeviceTypes.MediaRenderer = 'urn:schemas-upnp-org:device:MediaRenderer:1';

var ServiceTypes = ServiceTypes || {};
ServiceTypes.AVTransport = 'urn:schemas-upnp-org:service:AVTransport:1';
ServiceTypes.ConnectionManager = 'urn:schemas-upnp-org:service:ConnectionManager:1';
ServiceTypes.ContentDirectory = 'urn:schemas-upnp-org:service:ContentDirectory:1';
ServiceTypes.RenderingControl = 'urn:schemas-upnp-org:service:RenderingControl:1';

exports.DeviceTypes = DeviceTypes;
exports.ServiceTypes = ServiceTypes;