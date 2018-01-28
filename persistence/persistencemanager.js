/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const mongoose = require( 'mongoose' );
const ObjectId = mongoose.Types.ObjectId;

const JSMediaError = require( '../util/error' );
const PersistentRoot = require( './persistentroot' );

const sDBUrl = 'mongodb://localhost/jsmedia';
const sRootOfRootsId = '000000000000000000000000';
const sRootOfRootsTitle = 'RootOfRoots';
const sRootOfRootsUri = 'jsmedia://';

class PersistenceManager {
    constructor() {
        this.mDB = null;
        this.mRootOfRoots = null;
        this.mLogger = log4js.getLogger( 'jsmedia.persistence.PersistenceManager' );

        this.initRootOfRoots = inCallback => {
            const thePersistenceManager = this;
            PersistentRoot.findById( sRootOfRootsId )
                .then( function( inRoot ) {
                    if ( inRoot ) {
                        thePersistenceManager.mRootOfRoots = inRoot;
                        inCallback();
                        return;
                    }
                    thePersistenceManager.mRootOfRoots = new PersistentRoot();
                    thePersistenceManager.mRootOfRoots.setRoot( thePersistenceManager.mRootOfRoots ).setTitle( sRootOfRootsTitle )
                        .setUri( sRootOfRootsUri ).setId( new ObjectId( sRootOfRootsId ) )
                        .setLastModified( new Date() );
                    thePersistenceManager.mRootOfRoots.save().then( function() { inCallback(); } );
                } )
                .catch( function( inError ) {
                    inCallback( inError );
                } );
        };
    }

    connect( inCallback ) {
        const thePersistenceManager = this;
        if ( ! this.mDB ) {
            mongoose.connect( sDBUrl, { useMongoClient: true, })
                .then( function( inDB ) {
                    thePersistenceManager.mDB = mongoose.connection;
                    thePersistenceManager.initRootOfRoots( inCallback );
                } )
                .catch( function( inError ) {
                    inCallback( new JSMediaError( JSMediaError.Code_Persistence_DBConnect, 'Failed to connect to db', inError ) );
                } );
        } else {
            inCallback();
        }
    }

    disconnect() {
        this.mDB.close();
        this.mDB = null;
    }

    getObjectId( inIdString ) {
        return inIdString === '0' ? new ObjectId( sRootOfRootsId ) : new ObjectId( inIdString );
    }

    getRootOfRoots() {
        return this.mRootOfRoots;
    }

    isRootOfRoots( inRoot ) {
        return sRootOfRootsId === inRoot.getId().toHexString();
    }
}

module.exports = new PersistenceManager();