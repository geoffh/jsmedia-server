/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const mongoose = require( 'mongoose' );

const PersistentAlbum = require( './persistentalbum' );
const PersistentContainer = require( './persistentcontainer' );

const sLogger = log4js.getLogger( 'jsmedia.persistence.persistentartist' );
const persistentArtistSchema = new mongoose.Schema( {}, PersistentContainer.sOptions );
persistentArtistSchema.methods = {
    findAlbum( inTitle ) { return PersistentAlbum.findByParentAndTitle( this, inTitle ); },
    getType() { return 'artist'; }
};
const PersistentArtist = PersistentContainer.discriminator( 'PersistentArtist', persistentArtistSchema );

module.exports = PersistentArtist;