/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const mongoose = require( 'mongoose' );
const ObjectId = mongoose.Types.ObjectId;

const JSMediaError = require( '../util/error' );

const sLogger = log4js.getLogger( 'jsmedia.persistence.persistentcontainer' );
const persistentContainerSchema = new mongoose.Schema( {
        lastModified: { type: Date },        
        parent: { type: mongoose.Schema.Types.ObjectId, ref: 'PersistentContainer' },
        root: { type: mongoose.Schema.Types.ObjectId, ref: 'PersistentRoot', required: true },
        title: { type: String, required: true, default: 'Unknown' },
        uri: { type: String, unique : true, required : true, dropDups: true }
    }, { validateBeforeSave: true } );

persistentContainerSchema.methods = {
    delete() { return this.remove(); },
    getChildren( inOptions ) { return PersistentContainer.findByParent( this, inOptions ); },
    hasChildren() {
        const theContainer = this;
        return new Promise( function( inResolve, inReject ) {
            theContainer.getChildren().then( function( inChildren ) {
                inResolve( inChildren && inChildren.length > 0 );
            } );
        } );
    },

    getCreator() { return 'geoff Higgins'; },
    getId() { return this.get( '_id' ); },
    getIdString() { return this.getId().toString(); },
    getLastModified() { return this.get( 'lastModified' ); },
    getObject( inObjectName, inCallback ) {
        this.populate( inObjectName ).execPopulate().then(
            function( inContainer ) { inCallback( null, inContainer.get( inObjectName ) ); },
            function( inError ) { inCallback( inError, null ); } );
    },
    getObjectId( inObjectName ) {
        const theObject = this.get( inObjectName );
        return theObject ? theObject.toString() : "-1";
    },
    getParent( inCallback ) { this.getObject( 'parent', inCallback ); },
    getParentId() { return this.getObjectId( 'parent' ); },
    getRoot( inCallback ) { this.getObject( 'root', inCallback ); },
    getRootId() { return this.getObjectId( 'root' ); },    
    getTitle() { return this.get( 'title'); },
    getType() { return 'container'; },
    getUri() { return this.get( 'uri' ); },
    setLastModified( inLastModified ) { this.set( 'lastModified', inLastModified ); return this; },
    setParent( inParent ) { this.set( 'parent', inParent ); return this; },
    setRoot( inRoot ) { this.set( 'root', inRoot ); return this; },
    setTitle( inTitle ) { this.set( 'title', inTitle ); return this; },
    setUri( inUri ) { this.set( 'uri', inUri ); return this; }
};

persistentContainerSchema.statics = {
    findById( inId ) {
        return this.findOne( { _id: inId } );
    },

    findByParent( inParent, inOptions ) {
        const theSkip = inOptions && inOptions.skip ? inOptions.skip : 0;
        const theLimit = inOptions && inOptions.limit ? inOptions.limit : 0;
        return this.find( { parent: inParent } ).sort( { 'title': 1 } ).skip( theSkip ).limit( theLimit );
    },

    findByParentAndTitle( inParent, inTitle ) {
        return this.findOne( { parent: inParent, title: inTitle } );
    },

    findByRoot( inRoot ) {
        return this.find( { root: inRoot } ).sort( { 'title': 1 } );
    },

    findByUri( inUri ) {
        return this.findOne( { uri: inUri } );
    }
};

persistentContainerSchema.post( 'save', ( inTrack, inNext ) => {
    require( './persistencemanager' ).onSave( inTrack );
    if ( inNext ) {
        inNext();
    }
} );

persistentContainerSchema.post( 'remove', ( inTrack, inNext ) => {
    require( './persistencemanager' ).onRemove( inTrack );
    if ( inNext ) {
        inNext();
    }
} );

const PersistentContainer = mongoose.model( 'PersistentContainer', persistentContainerSchema );

module.exports = PersistentContainer;