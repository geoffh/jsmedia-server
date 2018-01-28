/* jshint esversion: 6 */
const http = require( 'http' );
const log4js = require( 'log4js' );
const upnp = require( 'peer-upnp' );

const theLogger = log4js.getLogger( 'jsmedia.upnp.peer' );
const theHttpPort = 8080;
let theUPNPPeerPrefix = '/upnp';
let theUPNPPeer;
let theUPNPPeerReady = false;

const createHttpServer = inPort => {
	theLogger.debug( 'Creating Http Server: port:' + inPort );
	const theHttpServer = http.createServer();
	theHttpServer.listen( inPort );
	return theHttpServer;
};

const createUPNPPeer = ( inPrefix, inHttpServer ) => {
	theLogger.debug( 'Creating UPNP Peer: prefix:' + inPrefix );
	return upnp.createPeer( {
		prefix: inPrefix,
		server: inHttpServer
	} );
};

const isUPNPPeerReady = () => theUPNPPeerReady;

const onUPNPPeerClose = () => {
	theLogger.debug( 'UPNP Peer has shut down' );
};

const onUPNPPeerReady = () => {
	theLogger.debug( 'UPNP Peer is ready' );
	theUPNPPeerReady = true;
};

const startUPNPPeer = () => {
	theLogger.debug( 'Starting UPNP Peer' );
	theUPNPPeer.start();
};

const stopUPNPPeer = () => {
	theLogger.debug( 'Stopping UPNP Peer' );
	theUPNPPeer.stop();
};

const theHttpServer = createHttpServer( theHttpPort );
theUPNPPeer = createUPNPPeer( theUPNPPeerPrefix, theHttpServer );
theUPNPPeer.on( 'ready', onUPNPPeerReady );
theUPNPPeer.on( 'close', onUPNPPeerClose );
startUPNPPeer();

exports.UPNPPeer = theUPNPPeer;
exports.isUPNPPeerReady = isUPNPPeerReady;
exports.startUPNPPeer = startUPNPPeer;
exports.stopUPNPPeer = stopUPNPPeer;