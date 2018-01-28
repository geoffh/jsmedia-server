/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const mongoose = require( 'mongoose' );

const JSMediaError = require( '../util/error' );

const sLogger = log4js.getLogger( 'jsmedia.persistence.persistenttrack' );
const persistentTrackSchema = new mongoose.Schema( {
        bitRate: Number,
        duration: Number,
        lastModified: Date,
        parent: { type: mongoose.Schema.Types.ObjectId, ref: 'PersistentAlbum', required: true },     
        protocolInfo: { type: String, required: true, default: '"http-get:*:audio/mpeg:*"' },
        root: { type: mongoose.Schema.Types.ObjectId, ref: 'PersistentRoot', required: true },
        title: { type: String, required: true, default: 'Unknown' },
        trackNumber: Number,
        uri: { type: String, unique : true, required : true, dropDups: true }
    }, { validateBeforeSave: true } );

persistentTrackSchema.methods = {
    delete() { return this.remove(); },
    getArtist( inCallback ) {
        this.getParent( function( inError, inAlbum ) {
            inAlbum.getParent( inCallback );
        } );
    },
    getAlbumId() { return this.getParentId(); },
    getAlbum( inCallback ) { this.getParent( inCallback ); },
    getBitRate() { return this.get( 'bitrate' ); },
    getCreator() { return 'geoff Higgins'; },
    getDuration() { return this.get( 'duration' ); },
    getId() { return this.get( '_id' ); },
    getIdString() { return this.getId().toString(); },
    getLastModified() { return this.get( 'lastModified' ); },
    getObject( inObjectName, inCallback ) {
        this.populate( inObjectName ).execPopulate().then(
            function( inTrack ) { inCallback( null, inTrack.get( inObjectName ) ); },
            function( inError ) { inCallback( inError, null ); } );
    },
    getObjectId( inObjectName ) { return this.get( inObjectName ).toString(); },
    getParent( inCallback ) { this.getObject( 'parent', inCallback ); },
    getParentId() { return this.getObjectId( 'parent' ); },
    getProtocolInfo() { return this.get( 'protocolInfo' ); },
    getRoot( inCallback ) { this.getObject( 'root', inCallback ); },
    getRootId() { return this.getObjectId( 'root' ); },    
    getTitle() { return this.get( 'title' ); },
    getTrackNumber() { return this.get( 'trackNumber' ); },
    getType() { return 'track'; },
    getUri() { return this.get( 'uri' ); },
    setAlbum( inAlbum ) { this.setParent( inAlbum ); },
    setBackendData( inBackendData ) { this.set( 'backendData', inBackendData ); return this; },
    setBitRate( inBitRate ) { this.set( 'bitRate', inBitRate ); return this; },
    setDuration( inDuration ) { this.set( 'duration', inDuration ); return this; },
    setLastModified( inLastModified ) { this.set( 'lastModified', inLastModified ); return this; },
    setParent( inParent ) { this.set( 'parent', inParent ); return this; },
    setProtocolInfo( inProtocolInfo ) { this.set( 'protocolInfo', inProtocolInfo ); return this; },
    setRoot( inRoot ) { this.set( 'root', inRoot ); return this; },
    setTitle( inTitle ) { this.set( 'title', inTitle ); return this; },
    setTrackNumber( inTrackNumber ) { this.set( 'trackNumber', inTrackNumber ); return this; },
    setUri( inUri ) { this.set( 'uri', inUri ); return this; }
};

persistentTrackSchema.statics = {
    findByParent( inParent, inOptions ) {
        const theSkip = inOptions && inOptions.skip ? inOptions.skip : 0;
        const theLimit = inOptions && inOptions.limit ? inOptions.limit : 0;   
        return this.find( { parent: inParent } ).sort( { 'trackNumber': 1, 'title': 1 } ).skip( theSkip ).limit( theLimit );
    },

    findById( inId ) {
        return PersistentTrack.findOne( { '_id': inId } );
    },

    findByRoot( inRoot ) {
        return PersistentTrack.find( { root: inRoot } ).sort( { 'title': 1 } );
    },

    findByUri( inUri ) {
        return PersistentTrack.findOne( { uri: inUri } );
    }
};

const PersistentTrack = mongoose.model( 'PersistentTrack', persistentTrackSchema );

module.exports = PersistentTrack;