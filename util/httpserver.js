/* jshint esversion: 6 */
const fs = require( 'fs' );
const http = require( 'http' );

const fileExists = require( './utils' ).fileExists;
const getLocalHostIPAddress = require( './utils' ).getLocalHostIPAddress;
const urlDecode = require( './utils' ).urlDecode;

class HttpServer {
	constructor() {
		this.mRoots = [];
		this.mURLPrefix = '';
		this.mHttpServer = http.createServer();
		this.mHttpServer.on( 'listening', this.onListening.bind( this ) );
		this.mHttpServer.on( 'request', this.onRequest.bind( this ) );
		this.mHttpServer.listen();
	}
	
	addDocumentRoot( inRoot ) {
		const theRoot = inRoot.replace( 'file://', '' );
		if ( this.mRoots.indexOf( theRoot ) === -1 ) {
			this.mRoots.push( theRoot );
		}
	}

	getDocumentURL( inURL ) {
		const theURL = inURL.replace( 'file://', '' );
		if ( ! this.haveRoot( theURL ) ) {
			return null;
		}
		return this.mURLPrefix + theURL;
	}

	haveRoot( inURL ) {
		for ( let theRoot of this.mRoots ) {
			if ( inURL.toUpperCase().startsWith( theRoot.toUpperCase() ) ) {
				return true;
			}
		}
		return false;
	}
		
	onListening() {
		console.log( 'Listening to ' + this.mHttpServer.address().port );
		getLocalHostIPAddress( inIPAddress =>
			this.mURLPrefix = 'http://' + inIPAddress + ':' + this.mHttpServer.address().port
		);
	}
		
	onRequest( inRequest, inResponse ) {
		const theURL = urlDecode( inRequest.url );
		if ( ! this.haveRoot( theURL ) || ! fileExists( theURL ) ) {
			inResponse.statusCode = 404;
			inResponse.end();
			return;
		}
		inResponse.statusCode = 200;
		const theStream = fs.createReadStream( theURL );
		theStream.on('open', function () {
			theStream.pipe( inResponse );
		});
		theStream.on( 'chunk', function( inChunk ) {
			inResponse.write( inChunk );
		});
		theStream.on( 'end', function() {
			inResponse.end();
		});
		theStream.on( 'error', function( inError ) {
			inResponse.end( inError );
		});
	}
}

module.exports = new HttpServer();