/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const FileBackend = require( './filebackend/backend' );

class BackendFactory {
    constructor() {
        this.mLogger = log4js.getLogger( 'jsmedia.backend.backendfactory' );
        this.mBackends = new Map();
    }

    getBackend( inUri, inCreate ) {
        let theBackend = this.mBackends.get( inUri );
        if ( ! theBackend && inCreate ) {
            if ( inUri.startsWith( 'file:' ) ) {
                theBackend = new FileBackend( inUri );
                this.mBackends.set( inUri, theBackend );
            }
        }
        return theBackend;
    }

    getBackends() {
        return this.mBackends.values;
    }
}

module.exports = new BackendFactory();