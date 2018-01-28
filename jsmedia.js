/* jshint esversion: 6 */
const api = require( './routes/api' );
const bodyParser = require( 'body-parser' );
const express = require( 'express' );
const path = require( 'path' );
const http = require( 'http' );
const log4js = require( 'log4js' );

const createMediaServerDevice = require( './upnp/device/local/localdevicefactory' ).createMediaServerDevice;
const Library = require( './library/library' );

log4js.configure( './logging/log4js.json', { reloadSecs: 300 } );
createMediaServerDevice( Library );

// Get our API route
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.post('*', (req, res) => {
  sLogger.info( 'post:*' );
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
