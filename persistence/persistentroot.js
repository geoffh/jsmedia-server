/* jshint esversion: 6 */
const log4js = require( 'log4js' );
const mongoose = require( 'mongoose' );

const PersistentArtist = require( './persistentartist' );
const PersistentContainer = require( './persistentcontainer' );

const sLogger = log4js.getLogger( 'jsmedia.persistence.persistentroot' );
const persistentRootSchema = new mongoose.Schema( {}, PersistentContainer.sOptions );
persistentRootSchema.methods = {
    findArtist( inTitle ) { return PersistentArtist.findByParentAndTitle( this, inTitle ); },
    getType() { return 'root'; },
    setId( inId ) { this.set( '_id', inId ); return this; }
};

const PersistentRoot = PersistentContainer.discriminator( 'PersistentRoot', persistentRootSchema );

module.exports = PersistentRoot;