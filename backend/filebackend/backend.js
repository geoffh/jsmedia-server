/* jshint esversion: 6 */
const fs = require( 'fs' );
const klaw = require( 'klaw' );
const log4js = require( 'log4js' );

const getTags = require( '../../util/id3tags' ).getTags;
const JSMediaError = require( '../../util/error' );
const MusicTrack = require( '../../library/musictrack' );
const durationToSeconds = require( '../../util/utils' ).durationToSeconds;

const sCreator = 'geoff Higgins';
const sMP3Suffix = '.mp3';
const sUriPrefix = 'file://';

class Backend {
	constructor( inRootUri ) {
		this.mLogger = log4js.getLogger( 'jsmedia.backend.filebackend.backend' );

		if ( ! inRootUri.startsWith( sUriPrefix ) ) {
			const theError = new JSMediaError( 0, 'Invalid root uri \'' + inRootUri + '\'' );
			this.mLogger.error( theError );
			throw( theError );
		}
		this.mRootUri = inRootUri;
	}

	getAlbumUri( inArtistName, inAlbumName ) {
		return this.getArtistUri( inArtistName ) + '/' + inAlbumName;
	}

	getArtistUri( inArtistName ) {
		return this.mRootUri + '/' + inArtistName;
	}

	getLastModified( inPath ) {
		const theStat = fs.lstatSync( inPath );
		return theStat ? theStat.mtime : null;
	}
	
	getTrack( inUri ) {
		const theBackend = this;
		return new Promise( function( inResolve, inReject ) {
			if ( ! theBackend.isValidTrackUri( inUri ) ) {
				const theError = new JSMediaError( JSMediaError.Code_Backend_InvalidURI, 'Invalid track uri \'' + inUri + '\'' );
				theBackend.mLogger.error( theError );
				inReject( theError );
				return;
			}
			const thePath = theBackend.uriToPath( inUri );
			getTags( thePath, function( inData, inError ) {
				if ( ! inError ) {
					const theMusicTrack = new MusicTrack()
						.setAlbum( inData.getAlbum() )					
						.setArtist( inData.getArtist() )
						.setDuration( durationToSeconds( inData.getDuration() ) )
						.setLastModified( theBackend.getLastModified( thePath ) )
						.setProtocolInfo( '"http-get:*:audio/mpeg:*"' )
						.setTrackNumber( theBackend.tagTrackNumberToTrackNumber( inData.getTrack() ) )
						.setTitle( inData.getTitle() )
						.setUri( inUri );
					theBackend.mLogger.debug( 'Created track for uri:' + theMusicTrack.getUri() );
					inResolve( theMusicTrack );
				} else {
					const theError = new JSMediaError( JSMediaError.Code_Backend_TagReadError, 'Failed to read tags for uri:' + inUri, inError );
					theBackend.mLogger.error( theError );
					inReject( theError );
				}
			} );
		} );
	}

	isValidTrackUri( inUri ) {
		 return inUri.startsWith( this.mRootUri ) && inUri.endsWith( sMP3Suffix );
	}

	listTracks() {
		const theBackend = this;
		return new Promise( function( inResolve, inReject ) {			
			const theTracks = [];
			let theError;
			theBackend.walkDirectories( function( inItem, inComplete, inError ) {
				if ( inError ) {
					theError = new JSMediaError( JSMediaError.Code_Backend_ItemAccess, 'Error accessing item \'' + inItem.path + '\'', inError );
					theBackend.mLogger.error( theError );
					inReject( theError );
					return;
				} else if ( inItem && inItem.stats.isFile() && inItem.path.endsWith( sMP3Suffix ) ) {
					const theTrack = new MusicTrack()
						.setLastModified( inItem.stats.mtime )
						.setUri( theBackend.pathToUri( inItem.path ) );
					theTracks.push(	theTrack );
					theBackend.mLogger.debug( 'Found track:' + theTrack.getUri() );
				}
				if ( inComplete ) {
					inResolve( theTracks );
				}
			} );
		});
	}

	pathToUri( inPath ) {
		return sUriPrefix + inPath;
	}

	tagTrackNumberToTrackNumber( inTrackNumber ) {
		if ( ! inTrackNumber ) {
			return null;
		}
		const theIndex = inTrackNumber.indexOf( '/' );
		return theIndex < 0 ? inTrackNumber : inTrackNumber.substring( 0, theIndex );
	}

	uriToPath( inUri ) {
		return inUri.substring( sUriPrefix.length );
	}

	walkDirectories( inCallback ) {
		klaw( this.uriToPath( this.mRootUri ) )
			.on( 'data',  function( inItem ) { inCallback( inItem ); } )
			.on( 'error', function( inError, inItem ) {	inCallback( inItem, inError ); } )
			.on( 'end',   function() { inCallback( null, true ); } );
	}
}

module.exports = Backend;