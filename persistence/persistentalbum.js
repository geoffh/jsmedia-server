/* jshint esversion: 6 */
const mongoose = require( 'mongoose' );
const log4js = require( 'log4js' );

const PersistentContainer = require( './persistentcontainer' );
const PersistentTrack = require( './persistenttrack' );

const sLogger = log4js.getLogger( 'jsmedia.persistence.persistentalbum' );
const persistentAlbumSchema = new mongoose.Schema( {}, PersistentContainer.sOptions );
persistentAlbumSchema.methods = {
    getChildren( inOptions ) { return PersistentTrack.findByParent( this, inOptions ); },
    getType() { return 'album'; }
};

const PersistentAlbum = PersistentContainer.discriminator( 'PersistentAlbum', persistentAlbumSchema );

module.exports = PersistentAlbum;