/* jshint esversion: 6 */
const childProcess = require( 'child_process' );
const JSMediaError = require( './error' );
const ID3MetaData = require( './id3metadata' );

const sNewLine = require( 'os' ).EOL;
const sMetaDataSeparator = ':';

const trackNumberFromMetaData = inMetaData => {
    if ( ! inMetaData ) {
        return null;
    }
    const theIndex = inMetaData.indexOf( '/' );
    return theIndex > 0 ? inMetaData.substring( 0, theIndex ) : inMetaData;
};

const parseMetaData = inMetaData => {    
    if ( ! inMetaData ) {
        return null;
    }
    const theLines = inMetaData.trim().split( sNewLine );
    if ( ! theLines ) {
        return null;
    }
    const theData = new ID3MetaData(); 
    theLines.forEach( inLine => {
        let theIndex = inLine.indexOf( sMetaDataSeparator );
        if ( theIndex > -1 ) {
            const theName = inLine.substring( 0, theIndex ).trim();
            let theValue = inLine.substring( theIndex + 1 ).trim();
            if ( theName === 'title' ) {
                theData.setTitle( theValue );
            } else if ( theName === 'album' ) {
                theData.setAlbum( theValue );
            } else if ( theName === 'artist' ) {
                theData.setArtist( theValue );
            } else if ( theName === 'track' ) {
                theData.setTrack( trackNumberFromMetaData( theValue ) );
            } else if ( theName === 'Duration' ) {
                theIndex = theValue.indexOf( ',' );
                if ( theIndex > -1 ) {
                    theValue = theValue.substring( 0, theIndex );
                    theData.setDuration( theValue );
                }
            }
        }
    } );
    return theData.isValid() ? theData : null;
};

const spawnProcess = ( inExec, inArgs, inCallback ) => {
    const theProcess = childProcess.spawn( inExec, inArgs, { detached: true, encoding: 'binary' } );
    let theOutput = "";
    theProcess.on( 'close', function( inCode ) {
        if ( inCode === 0 ) {
            const theData = parseMetaData( theOutput );
            if ( theData ) {
                inCallback( theData );
            } else {
                inCallback( null, new JSMediaError( -1, 'Error: ffmpeg failed to retrieve mp3 tags' ) );
            }
        } else {
            inCallback( null, new JSMediaError( -1, 'Error: ffmpeg failed' ) );
        }
    } );
    theProcess.stderr.on( 'data', function( inData ) {
        theOutput += inData.toString();
    } );
};

const getMetaData = ( inFile, inCallback ) => spawnProcess( 'ffmpeg', [ '-i', inFile, '-f', 'ffmetadata', 'pipe:1' ], inCallback );

exports.getMetaData = getMetaData;