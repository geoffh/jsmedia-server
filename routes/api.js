/* jshint esversion: 6 */
const router = require( 'express' ).Router();
const log4js = require( 'log4js' );

const Devices = require( '../upnp/devices' );
const Library = require( '../library/library' );
const mapContentToExternalForm = require( './contentmapper' ).mapContentToExternalForm;

const sLogger = log4js.getLogger( 'jsmedia.routes.api' );

router.get( '/devices/mediarenderers', ( inRequest, inResponse ) => {
  const theMediaRenderers = [];
  Devices.getMediaRenderers().map( inMediaRenderer =>
    theMediaRenderers.push( {
      deviceUDN: inMediaRenderer.getDeviceUDN(),
      deviceFriendlyName: inMediaRenderer.getDeviceFriendlyName()
    } )
  );
  inResponse.send( {
      status: 'OK',
      mediaRenderers: theMediaRenderers
    } );
} );

router.post( '/devices/mediarenderers/:mediarendererId/play', ( inRequest, inResponse ) => {
  Library.getTrack( inRequest.body.trackId, ( inError, inTrack ) => {
    Devices.play( inRequest.params.mediarendererId, inTrack.getUri(), inResult =>
      inResponse.end( JSON.stringify( { status: 'OK' } ) )
    );  
  } );
} );

router.get( '/library/container/:containerId', ( inRequest, inResponse ) => {
  Library.getContainer( inRequest.params.containerId, function( inError, inContainer ) {
    inResponse.send( mapContentToExternalForm( inContainer ) );
  } );
} );

router.get( '/library/container/:containerId/children', ( inRequest, inResponse ) => {
  Library.browseContainer( inRequest.params.containerId, null, function( inError, inContainers ) {
    const theContents = [];
    inContainers.map( inContent => theContents.push( mapContentToExternalForm( inContent ) ) );
    inResponse.send( theContents );
  } );
} );

router.post( '/library/roots/add', ( inRequest, inResponse ) => {
  Library.addRoot( inRequest.body.path, inRequest.body.title, function( inResult ) {
      inResponse.end( JSON.stringify( { status: 'OK' } ) );
  } );
} );

module.exports = router;