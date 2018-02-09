/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const BackendFactory = require( '../backend/backendfactory' );
const PersistentAlbum = require( '../persistence/persistentalbum' );
const PersistentArtist = require( '../persistence/persistentartist' );
const PersistentTrack = require( '../persistence/persistenttrack' );

const sMongoDuplicateError = 11000;

class RootRefresh {
    constructor( inRoot ) {
        this.mRoot = inRoot;
        this.mLogger = log4js.getLogger( 'jsmedia.library.rootrefresh' );
    }

    createAlbum ( inBackend, inArtist, inAlbumTitle, inIgnoreDuplicate, inUpdateLastModified ) {
        const theRootRefresh = this;
        return new Promise( function( inResolve, inReject ) {
            const theAlbum =
                new PersistentAlbum().setParent( inArtist ).setRoot( theRootRefresh.mRoot )
                    .setTitle( inAlbumTitle ).setUri( inBackend.getAlbumUri( inArtist.getTitle(), inAlbumTitle ) );
            if ( inUpdateLastModified ) {
                theAlbum.setLastModified( new Date() );
            }
            theAlbum.save()
                .then( function() { inResolve( theAlbum ); } )
                .catch( function( inError ) {
                    if ( inIgnoreDuplicate && inError.code === sMongoDuplicateError ) {
                        PersistentAlbum.findByParentAndTitle( inArtist, inAlbumTitle )
                            .then( function( inAlbum ) {
                                inResolve( inAlbum );
                            } );
                    } else {
                        inReject( inError );
                    }
                } );
        } );
    }

    createArtist( inBackend, inArtistTitle, inIgnoreDuplicate, inUpdateLastModified ) {
        const theRootRefresh = this;
        return new Promise( function( inResolve, inReject ) {
            const theArtist =
                new PersistentArtist().setParent( theRootRefresh.mRoot ).setRoot( theRootRefresh.mRoot )
                    .setTitle( inArtistTitle ).setUri( inBackend.getArtistUri( inArtistTitle ) );
            if ( inUpdateLastModified ) {
                theArtist.setLastModified( new Date() );
            }
            theArtist.save()
                .then( function() { inResolve( theArtist ); } )
                .catch( function( inError ) {
                    if ( inError.code !== sMongoDuplicateError ) {
                        theRootRefresh.mRoot.setLastModified( new Date() );
                    }
                    if ( inIgnoreDuplicate && inError.code === sMongoDuplicateError ) {
                        PersistentArtist.findByParentAndTitle( theRootRefresh.mRoot, inArtistTitle )
                            .then( function( inArtist ) { inResolve( inArtist ); } );
                    } else {
                        inReject( inError );
                    }
                } );
        } );
    }

    createTrack( inBackend, inBackendTrack ) {
        this.mLogger.debug( 'Creating track:' + inBackendTrack.getUri() );
        const theRootRefresh = this;
        const doCreate = async function( inBackendTrack ) {
            const theBackendTrack = await inBackend.getTrack( inBackendTrack.getUri() );
            const theArtist = await theRootRefresh.createArtist( inBackend, theBackendTrack.getArtist(), true, true );
            const theAlbum = await theRootRefresh.createAlbum( inBackend, theArtist,theBackendTrack.getAlbum(), true, true );
            const theTrack = new PersistentTrack()
                .setBitRate( inBackendTrack.getBitRate() ).setDuration( inBackendTrack.getDuration() )
                .setLastModified( inBackendTrack.getLastModified() ).setParent( theAlbum ).setRoot( theRootRefresh.mRoot )
                .setProtocolInfo( inBackendTrack.getProtocolInfo() ).setTrackNumber( inBackendTrack.getTrackNumber() )
                .setTitle( inBackendTrack.getTitle() ).setUri( inBackendTrack.getUri() );
            await theTrack.save();
        };
        return doCreate( inBackendTrack );
    }

    async run() {
        this.mLogger.debug( 'Running root refresh:' + this.mRoot.getUri() );
        const theRootRefresh = this;
        const theBackend = BackendFactory.getBackend( this.mRoot.getUri(), true );
        if ( ! theBackend ) {
            this.mLogger.error( 'Failed to create backend:' + this.mRoot.getUri() );
            return;
        }
        try {
            const theBackendTracks = await theBackend.listTracks();
            const theBackendTracksMap = new Map();
            for ( let theIndex = 0; theIndex < theBackendTracks.length; theIndex ++ ) {
                theBackendTracksMap.set( theBackendTracks[ theIndex ].getUri(), theBackendTracks[ theIndex ] );
            }
            await theRootRefresh.refreshDeletions( theBackendTracksMap );
            await theRootRefresh.refreshCreations( theBackend, theBackendTracksMap );
            await theRootRefresh.refreshCleanup();
        } catch( theException ) {
            this.mLogger.error( theException );
        }
    }

    refreshCleanup() {
        this.mLogger.debug( 'Refresh cleanup:' + this.mRoot.getUri() );
        const theRootRefresh = this;
        const doRefresh = async function() {
            const theAlbums = await PersistentAlbum.findByRoot( theRootRefresh.mRoot );
            for ( let theIndex = 0; theIndex < theAlbums.length; theIndex ++ ) {
                if ( ! await theAlbums[ theIndex ].hasChildren() ) {
                    theRootRefresh.mLogger.debug( 'Deleting empty album:' + theAlbums[ theIndex ].getUri() );
                    await theAlbums[ theIndex ].delete();
                }
            }
            const theArtists = await PersistentArtist.findByRoot( theRootRefresh.mRoot );
            for ( let theIndex = 0; theIndex < theArtists.length; theIndex ++ ) {
                if ( ! await theArtists[ theIndex ].hasChildren() ) {
                    theRootRefresh.mLogger.debug( 'Deleting empty artist:' + theArtists[ theIndex ].getUri() );
                    await theArtists[ theIndex ].delete();
                }
            }
        };
        return doRefresh();
    }

    refreshCreations( inBackend, inBackendTracks ) {
        this.mLogger.debug( 'Refresh creations:' + this.mRoot.getUri() );
        const theRootRefresh = this;
        const doRefresh = async function( inBackendTracks ) {
            const theUris = Array.from( inBackendTracks.keys() );
            for ( let theIndex = 0; theIndex < theUris.length; theIndex ++ ) {
                const theTrack = await PersistentTrack.findByUri( theUris[ theIndex ] );
                let theBackendTrack;
                if ( ! theTrack ) {
                    theBackendTrack = await inBackend.getTrack( theUris[ theIndex ] );
                    await theRootRefresh.createTrack( inBackend, theBackendTrack );
                } else if ( inBackendTracks.get( theUris[ theIndex ] ).getLastModified() - theTrack.getLastModified() > 0 ) {
                    theBackendTrack = await inBackend.getTrack( theUris[ theIndex ] );
                    await theRootRefresh.updateTrack( inBackend, theBackendTrack, theTrack );
                }
            }
        };
        return doRefresh( inBackendTracks );
    }

    refreshDeletions( inBackendTracks ) {
        this.mLogger.debug( 'Refresh deletions:' + this.mRoot.getUri() );
        const theRootRefresh = this;
        const doRefresh = async function( inBackendTracks ) {
            const theTracks = await PersistentTrack.findByRoot( theRootRefresh.mRoot );
            for ( let theIndex = 0; theIndex < theTracks.length; theIndex ++ ) {
                if ( ! inBackendTracks.has( theTracks[ theIndex ].getUri() ) ) {
                    theRootRefresh.mLogger.debug( 'Deleting track:' + theTracks[ theIndex ].getUri() );
                    await theTracks[ theIndex ].delete();
                }
            }
        };
        return doRefresh( inBackendTracks );
    }

    updateTrack( inBackend, inBackendTrack, inTrack ) {
        this.mLogger.debug( 'Updating track:' + inBackendTrack.getUri() );
        const theRootRefresh = this;
        const doUpdate = async function( inBackendTrack ) {
            const theBackendTrack = await inBackend.getTrack( inBackendTrack.getUri() );
            const theArtist = await theRootRefresh.createArtist( inBackend, theBackendTrack.getArtist(), true );
            const theAlbum = await theRootRefresh.createAlbum( inBackend, theArtist, theBackendTrack.getAlbum(), true );
            let needsSave = false;
            if ( inTrack.getAlbumId().toString() !== theAlbum.getId().toString()  ) {
                needsSave = true;
                inTrack.setAlbum( theAlbum );
            }
            if ( inTrack.getBitRate() !== inBackendTrack.getBitRate() ) {
                needsSave = true;
                inTrack.setBitRate( inBackendTrack.getBitRate() );
            }
            if ( inTrack.getDuration() !== inBackendTrack.getDuration() ) {
                needsSave = true;
                inTrack.setDuration( inBackendTrack.getDuration() );
            }
            if ( inTrack.getLastModified() !== inBackendTrack.getLastModified() ) {
                needsSave = true;
                inTrack.setLastModified( inBackendTrack.getLastModified() );
            }
            if ( inTrack.getProtocolInfo() !== inBackendTrack.getProtocolInfo() ) {
                needsSave = true;
                inTrack.setProtocolInfo( inBackendTrack.getProtocolInfo() );
            }
            if ( inTrack.getTitle() !== inBackendTrack.getTitle() ) {
                needsSave = true;
                inTrack.setTitle( inBackendTrack.getTitle() );
            }
            if ( inTrack.getTrackNumber() !== inBackendTrack.getTrackNumber() ) {
                needsSave = true;
                inTrack.setTrackNumber( inBackendTrack.getTrackNumber() );
            }
            if ( needsSave ) {
                await inTrack.save();
            }
        };
        return doUpdate( inBackendTrack );
    }
}

module.exports = RootRefresh;