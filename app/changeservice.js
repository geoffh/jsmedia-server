/* jshint esversion: 6 */
const app = require( 'express' )();
const http = require( 'http' ).Server( app );
const io = require( 'socket.io' )( http );
const log4js = require( 'log4js' );

const mapContentToExternalForm = require( '../util/contentmapper' ).mapContentToExternalForm;
const PersistenceManager = require('../persistence/persistencemanager' );

const sRoomName = 'subscriptionRoom';

class ChangeService {
    constructor( inPort ) {
        this.mLogger = log4js.getLogger( 'jsmedia.app.changeservice' );
        io.on( 'connection', inSocket => {
            inSocket.join( sRoomName );
        } );

        http.listen( inPort, () => this.mLogger.debug( `Change Service available at localhost:${inPort}` ) );

        PersistenceManager.addListener( this );
    }

    notify( inEvent, inData ) {
        io.to( sRoomName ).emit( inEvent, mapContentToExternalForm( inData ) );
    }

    onRemove( inData ) {
        this.notify( 'remove', inData );
    }

    onSave( inData ) {
        this.notify( 'save', inData );
    }
}

module.exports = ChangeService;