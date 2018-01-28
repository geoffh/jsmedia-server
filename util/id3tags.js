/* jshint esversion: 6 */

const ffmpeg = require( './ffmpeg' );

const thePendingRequests = [];
const theRunningRequests = [];
let theMaxParallelRequests = 5;
let theInterval;

const processRequest = inRequest => {
	ffmpeg.getMetaData( inRequest.file, function( inResult, inError ) {
		inRequest.callback( inResult, inError );
		theRunningRequests.splice( theRunningRequests.indexOf( inRequest ), 1 );
	} );
};

const processRequests = () => {
	while ( thePendingRequests.length > 0 && theRunningRequests.length < theMaxParallelRequests ) {
		const theRequest = thePendingRequests.shift();
		theRunningRequests.push( theRequest );
		processRequest( theRequest );
	}
	if ( thePendingRequests.length === 0 ) {
		clearInterval( theInterval );
		theInterval = null;
	}
};

const getTags = ( inFile, inCallback ) => {
	thePendingRequests.push( { file: inFile, callback: inCallback } );
	if ( ! theInterval ) {
		theInterval = setInterval( processRequests, 100 );
	}
};

const setMaxParallelRequests = inMaxParallelRequests => theMaxParallelRequests = inMaxParallelRequests;

exports.getTags = getTags;
exports.setMaxParallelRequests = setMaxParallelRequests;