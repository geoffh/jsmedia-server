/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const BackendFactory = require( '../backend/backendfactory' );
const JSMediaError = require( '../util/error' );
const PersistenceManager = require( '../persistence/persistencemanager' );
const PersistentContainer = require( '../persistence/persistentcontainer' );
const PersistentRoot = require( '../persistence/persistentroot' );
const PersistentTrack = require( '../persistence/persistenttrack' );
const RootRefresh = require( './rootrefresh' );

const sCreator = 'geoff Higgins';
const sMongoDuplicateError = 11000;

class Library {
    constructor() {
        this.mIsReady = false;
        this.mLogger = log4js.getLogger( 'jsmedia.library.library' );
        const theLibrary = this;
        PersistenceManager.connect( inError => {
            if ( inError ) {
                throw( inError );
            } else {
                theLibrary.setIsReady( true );
                theLibrary.scheduleRefresh();
            }
        } );
    }

    addRoot( inUri, inTitle, inCallback ) {
        if ( ! this.isReady() ) {
            const theLibrary = this;
            setTimeout( function() { theLibrary.addRoot( inUri, inTitle, inCallback ); }, 50 );
            return;
        }
        this.mLogger.debug( 'Adding root uri:' + inUri + ' title:' + inTitle );
        const theBackend = BackendFactory.getBackend( inUri, true );
        if ( ! theBackend ) {
            inCallback( new JSMediaError( JSMediaError.Code_Backend_InvalidURI, 'Failed to create backend for uri \'' + inUri + '\'' ) );
            return;
        }
        const theRoot = new PersistentRoot();
        theRoot.setParent( PersistenceManager.getRootOfRoots() ).setRoot( PersistenceManager.getRootOfRoots() )
               .setTitle( inTitle ).setUri( inUri ).setLastModified( new Date() );
        theRoot.save( function( inError ) {
            const theError = inError ?
                 new JSMediaError( 0, 'Failed to add root \'' + inUri + '\'', inError ) : null;
            if ( ! theError ) {
                PersistenceManager.getRootOfRoots().setLastModified( new Date() ).save( function( inError ) {
                    inCallback( theError, theRoot );
                });
            } else {
                inCallback( theError, theRoot );
            }
        } );
    }

    async browseContainer( inContainerId, inOptions, inCallback ) {
        if ( ! this.isReady() ) {
            const theLibrary = this;
            setTimeout( function() { theLibrary.browseContainer( inContainerId, inOptions, inCallback ); }, 50 );
            return;
        }
        try {
            this.getContainer( inContainerId, ( inError, inContainer ) => {
                if ( inError ) {
                    inCallback( inError );
                    return;
                }
                inContainer.getChildren( inOptions )
                    .then( inChildren => { inCallback( null, inChildren ); } )
                    .catch( inError => { inCallback( inError ); } );
            } );
        } catch( theException ) {
            inCallback( theException );
        }
    }

    async getContainer( inContainerId, inCallback ) {
        if ( ! this.isReady() ) {
            const theLibrary = this;
            setTimeout( function() { theLibrary.getContainer( inContainerId, inCallback ); }, 50 );
            return;
        }
        try {
            const theContainer = await PersistentContainer.findById( PersistenceManager.getObjectId( inContainerId ) );
            if ( ! theContainer ) {
                inCallback( null, null );
                return;
            }
            inCallback( null, theContainer );
        } catch( theException ) {
            inCallback( theException );
        }
    }

    getTrack( inTrackId, inCallback ) {
        PersistentTrack.getById( inTrackId )
            .then( inTrack => inCallback( null, inTrack ) )
            .catch( inError => inCallback( inError ) );
    }

    getRoots( inCallback ) {
        this.browseContainer( "0", null, ( inError, inChildren ) => {
            if ( inError ) {
                inCallback( inError );
            } else {
                inCallback( null, inChildren );
            }
        } );
    }

    isReady() {
        return this.mIsReady;
    }

    refreshRoots( inCallback ) {
        this.mLogger.debug( 'Refreshing roots' );
        const theLibrary = this;
        PersistentRoot.find()
            .then( function( inRoots ) {
                const thePromises = [];
                for ( let theIndex = 0; theIndex < inRoots.length; theIndex ++ ) {
                    if ( ! PersistenceManager.isRootOfRoots( inRoots[ theIndex ] ) ) {
                        thePromises.push( new RootRefresh( inRoots[ theIndex ] ).run() );
                    }
                }
                return Promise.all( thePromises );
            } )
            .then( function() {
                theLibrary.scheduleRefresh();
            } )
            .catch( function(inError ) {
                console.log( inError );
            } );
    }

    scheduleRefresh() {
        const theLibrary = this;
        setTimeout( function() { theLibrary.refreshRoots(); }, 5000 );
    }

    setIsReady( inIsReady ) {
        this.mIsReady = inIsReady;
    }
}

module.exports = new Library();