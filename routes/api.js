/* jshint esversion: 6 */
const router = require( 'express' ).Router();
const log4js = require( 'log4js' );

const Devices = require( '../upnp/devices' );
const Library = require( '../library/library' );
const mapContentToExternalForm = require( '../util/contentmapper' ).mapContentToExternalForm;

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
      mediaRenderers: theMediaRenderers
  } );
} );

router.post( '/devices/mediarenderers/:mediarendererId/play', ( inRequest, inResponse ) => {
  Library.getTrack( inRequest.body.trackId, ( inError, inTrack ) => {
    if ( inError ) {
      inResponse.status( 500 ).send( { error: inError } );
    } else {
      Devices.play( inRequest.params.mediarendererId, inTrack.getUri(), inError => {
        if ( inError ) {
          inResponse.status( 500 ).send( { error: inError } );
        } else {
          inResponse.end();
        }
      } );  
    }
  } );
} );

router.get( '/library/container/:containerId', ( inRequest, inResponse ) => {
  Library.getContainer( inRequest.params.containerId, function( inError, inContainer ) {
    if ( inError ) {
      inResponse.status( 500 ).send( { error: inError } );
    } else if ( ! inContainer ) {
      inRespose.status( 404 ).send( 'Container ' + inRequest.params.containerId + ' not found' );
    } else {
      inResponse.send( mapContentToExternalForm( inContainer ) );
    }
  } );
} );

router.get( '/library/container/:containerId/children', ( inRequest, inResponse ) => {
  Library.browseContainer( inRequest.params.containerId, null, function( inError, inContainers ) {
    if ( inError ) {
      inResponse.status( 500 ).send( { error: inError } );
    } else {
      const theContents = [];
      inContainers.map( inContent => theContents.push( mapContentToExternalForm( inContent ) ) );
      inResponse.send( theContents );
    }
  } );
} );

router.post( '/library/roots/add', ( inRequest, inResponse ) => {
  Library.addRoot( inRequest.body.path, inRequest.body.title, function( inError ) {
    if ( inError ) {
      inResponse.status( 500 ).send( { error: inError } );
    } else {
      inResponse.end();
    }
  } );
} );

module.exports = router;