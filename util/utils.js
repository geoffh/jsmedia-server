/* jshint esversion: 6 */
const fs = require( 'fs' );
const ifaces = require( 'os' ).networkInterfaces();

const durationToSeconds = inDuration => {
    if ( ! inDuration ) {
		return 0;
    }
    const theIndex = inDuration.lastIndexOf( '.' );
    if ( theIndex ) {
        inDuration = inDuration.substring( 0, theIndex );
    }
    const theValues = inDuration.split( ':' );
    let theDuration = theValues[ 0 ] * 60 * 60;
    theDuration += theValues[ 1 ] * 60;
    theDuration += theValues[ 2 ] * 1;
    return theDuration;
};

const getLocalHostIPAddress = inCallback => {
    Object.keys( ifaces ).forEach( function( ifname ) {
        let alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
            }

            if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            } else {
            // this interface has only one ipv4 adress
            inCallback( iface.address );
            return;
            }
            ++alias;
        });
    });
};

const fileExists = inPath => {
    try {
        fs.lstatSync( inPath );
        return true;
	} catch( theException ) {
        return false;
    }
};

const secondsToDuration = inSeconds => {
    const theHours = Math.floor( inSeconds / 3600 );
    const theMinutes = Math.floor( ( inSeconds - ( theHours * 3600 ) ) / 60 );
    const theSeconds = ( inSeconds - ( theHours * 3600 ) - ( theMinutes * 60 ) );
    let theDuration = theHours > 10 ? theHours : '0' + theHours;
    theDuration += ':';
    theDuration += theMinutes > 10 ? theMinutes : '0' + theMinutes;
    theDuration += ':';
    theDuration += theSeconds > 10 ? theSeconds : '0' + theSeconds;
    return theDuration;
};

const urlHttpDecode = inURL => inURL.replace( /%20/gi, ' ' );

const urlHttpEncode = inURL => inURL.replace( / /gi, '%20' );

exports.durationToSeconds = durationToSeconds;
exports.fileExists = fileExists;
exports.getLocalHostIPAddress = getLocalHostIPAddress;
exports.secondsToDuration = secondsToDuration;
exports.urlHttpDecode = urlHttpDecode;
exports.urlHttpEncode = urlHttpEncode;