/* jshint esversion: 6 */
const api = require( '../routes/api' );
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const path = require( 'path' );
const http = require( 'http' );
const log4js = require( 'log4js' );

class App {
    constructor( inPort ) {
        this.mLogger = log4js.getLogger( 'jsmedia.app.app' );
        const app = express();
        app.use( ( req, res, next ) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        } );
        app.use( bodyParser.json() );
        app.use( bodyParser.urlencoded( { extended: false } ) );
        app.use( express.static( path.join( __dirname, 'dist' ) ) );
        app.use( '/api', api );
        app.get( '*', ( req, res ) => {
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        } );
        app.post( '*', ( req, res ) => {
            sLogger.info( 'post:*' );
        } );
        app.set( 'port', inPort );
        const server = http.createServer( app );
        server.listen( inPort, () => this.mLogger.debug( `API available at localhost:${inPort}` ) );
    }
}

module.exports = App;