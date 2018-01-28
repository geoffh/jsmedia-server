/* jshint esversion: 6 */
const HttpServer = require( '../../util/httpserver' );
const PersistentAlbum = require( '../../persistence/persistentalbum' );
const PersistentArtist = require( '../../persistence/persistentartist' );
const PersistentContainer = require( '../../persistence/persistentcontainer' );
const PersistentRoot = require( '../../persistence/persistentroot' );
const PersistentTrack = require( '../../persistence/persistenttrack' );
const secondsToDuration = require( '../../util/utils' ).secondsToDuration;

const sDIDLStart = '<DIDL-Lite xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/" ' +
                   'xmlns:dc="http://purl.org/dc/elements/1.1/" ' +
                   'xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/">';
const sDIDLEnd = '</DIDL-Lite>';

const browseResultToDIDL = function( inService, inResult, inCallback ) {
    let theResult = sDIDLStart;
    let theCount = 0;
    inResult.contents.map( inContent =>
        persistentObjectToDIDL( inContent, ( inError, inDIDL ) => {
            ++ theCount;
            theResult += inDIDL;
            if ( theCount === inResult.contents.length ) {
                theResult += sDIDLEnd;
                inCallback( null, {
                    Result: theResult,
                    NumberReturned: inResult.contents.length,
                    TotalMatches: inResult.contents.length,
                    UpdateID: 0
                } );
            }
        } )
    );    
};

const persistentObjectToDIDL = function( inPersistentObject, inCallback ) {
    if ( inPersistentObject instanceof PersistentContainer ) {
        persistentContainerToDIDL( inPersistentObject, inCallback );
    } else if ( inPersistentObject instanceof PersistentTrack ) {
        persistentTrackToDIDL( inPersistentObject, inCallback );
    } else {
        inCallback( null, '' );
    }
};

const persistentContainerToDIDL = function( inPersistentContainer, inCallback ) {
    let theDIDL = '<container childCount="0" id="' + inPersistentContainer.getId() +
           '" parentID="' + inPersistentContainer.getParentId() +
           '" restricted="true" searchable="false">' +
           '<dc:title>' + inPersistentContainer.getTitle() + '</dc:title>' +
           '<dc:creator>' + inPersistentContainer.getCreator() + '</dc:creator>';
    if ( inPersistentContainer instanceof PersistentRoot ) {
        theDIDL += '<upnp:class>object.container.storageFolder</upnp:class>' +
           '<upnp:storageUsed>0</upnp:storageUsed>';
    } else if ( inPersistentContainer instanceof PersistentArtist ) {
        theDIDL += '<upnp:class>object.container.person.musicArtist</upnp:class>';
    } else if ( inPersistentContainer instanceof PersistentAlbum ) {
        theDIDL += '<upnp:class>object.container.album.musicAlbum</upnp:class>';
    }
    theDIDL +=  '</container>';
    inCallback( null, theDIDL );
};

const persistentTrackToDIDL = function( inPersistentTrack, inCallback ) {
    let theDIDL = '<item id="' + inPersistentTrack.getId() +
           '" parentID="' + inPersistentTrack.getParentId() +
           '" restricted="false">' +
           '<dc:title>' + inPersistentTrack.getTitle() + '</dc:title>' +
           '<dc:creator>' + inPersistentTrack.getCreator() + '</dc:creator>' +
           '<upnp:class>object.item.audioItem.musicTrack</upnp:class>';
    inPersistentTrack.getAlbum( ( inError, inPersistentAlbum ) => {
        theDIDL += '<upnp:album>' + inPersistentAlbum.getTitle() + '</upnp:album>';
        inPersistentTrack.getArtist( ( inError, inPersistentArtist ) => {
            theDIDL += '<upnp:artist role="">' + inPersistentArtist.getTitle() + '</upnp:artist>';
            theDIDL += '<res bitrate="' + inPersistentTrack.getBitRate() + 
                '" duration="' + secondsToDuration( inPersistentTrack.getDuration() ) + 
                '" protocolInfo=' + inPersistentTrack.getProtocolInfo() + '>' +
                HttpServer.getDocumentURL( inPersistentTrack.getUri() ) +
                //'http://192.168.1.7:40699/home/geoffh/Music/ACDC/Misc/Back%20In%20Black-ACDC-Misc.mp3' + 
                '</res></item>';
                inCallback( null, theDIDL );
        } );
    } );    
};

exports.browseResultToDIDL = browseResultToDIDL;