/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const App = require( './app/app' );
const createMediaServerDevice = require( './upnp/device/local/localdevicefactory' ).createMediaServerDevice;
const Library = require( './library/library' );
const ChangeService = require( './app/changeservice' );

log4js.configure( './logging/log4js.json', { reloadSecs: 300 } );
createMediaServerDevice( Library );
new App( process.env.APP_PORT || '3001' );
new ChangeService( process.env.CHANGE_PORT || '3002' );