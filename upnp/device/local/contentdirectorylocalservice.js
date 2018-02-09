/* jshint esversion: 6 */
const log4js = require( 'log4js' );

const HttpServer = require( '../../../util/httpserver' );
const LocalService = require( './localservice' );
const browseResultToDIDL = require( '../../didl/didlcreator' ).browseResultToDIDL;

class ContentDirectoryLocalService extends LocalService {
	constructor( inLibrary ) {
		super( 'ContentDirectory', '1' );
		this.mLibrary = inLibrary;
		this.mLogger = log4js.getLogger( 'jsmedia.upnp.device.local.ContentDirectoryLocalService' );

		inLibrary.getRoots( ( inError, inRoots ) => {
			for ( let theIndex = 0; theIndex < inRoots.length; theIndex ++ ) {
				HttpServer.addDocumentRoot( inRoots[ theIndex ].getUri() );
			}
		} );
		
		setInterval( function() {
			this.set( 'ContainerUpdateIDs', 'asd' );
		}.bind( this ), 5000 );
		
		this.addImplementations( this, {			
			'Browse': this.browse,
			'CreateObject': this.createObject,
			'CreateReference': this.createReference,
			'DeleteResource': this.deleteResource,
			'DestroyObject': this.destroyObject,
			'ExportResource': this.exportResource,
			'GetSearchCapabilities': this.getSearchCapabilities,
			'GetSortCapabilities': this.getSortCapabilities,
			'GetSystemUpdateID': this.getSystemUpdateID,
			'GetTransferProgress': this.getTransferProgress,
			'ImportResource': this.importResource,
			'Search': this.search,
			'StopTransferResource': this.stopTransferResource,
			'UpdateObject': this.updateObject
		} );
		
	    this.addAction( 'Browse',
	    		        { ObjectID: 'A_ARG_TYPE_ObjectID',
	    	              BrowseFlag: 'A_ARG_TYPE_BrowseFlag',
	    	              Filter: 'A_ARG_TYPE_Filter',
	    	              StartingIndex: 'A_ARG_TYPE_Index',
	    	              RequestedCount: 'A_ARG_TYPE_Count',
	    	              SortCriteria: 'A_ARG_TYPE_SortCriteria' },
	    		        { Result: 'A_ARG_TYPE_Result',
		    	          NumberReturned: 'A_ARG_TYPE_Count',
		    	          TotalMatches: 'A_ARG_TYPE_Count',
		    	          UpdateID: 'A_ARG_TYPE_UpdateID'} );
	    this.addAction( 'CreateObject',
	    		        { ContainerID: 'A_ARG_TYPE_ObjectID', Elements: 'A_ARG_TYPE_Result' },
	    	            { ObjectID: 'A_ARG_TYPE_ObjectID', Result: 'A_ARG_TYPE_Result' } );
	    this.addAction( 'CreateReference',
		                { ContainerID: 'A_ARG_TYPE_ObjectID', ObjectID: 'A_ARG_TYPE_ObjectID' },
	                    { NewID: 'A_ARG_TYPE_ObjectID' } );
	    this.addAction( 'DeleteResource', { ResourceURI: 'A_ARG_TYPE_URI' }, null );
	    this.addAction( 'DestroyObject', { ObjectID: 'A_ARG_TYPE_ObjectID' }, null );
	    this.addAction( 'ExportResource',
	    		        { SourceURI: 'A_ARG_TYPE_URI', DestinationURI: 'A_ARG_TYPE_URI' },
	    		        { TransferID: 'A_ARG_TYPE_TransferID' } );
	    this.addAction( 'GetSearchCapabilities', null, { SearchCaps: 'SearchCapabilities' } );
	    this.addAction( 'GetSortCapabilities', null, { SortCaps: 'SortCapabilities' } );
	    this.addAction( 'GetSystemUpdateID', null, { Id: 'SystemUpdateID' } );
	    this.addAction( 'GetTransferProgress',
	    		        { TransferID: 'A_ARG_TYPE_TransferID' },
	    	            { TransferStatus: 'A_ARG_TYPE_TransferStatus',
	    		          TransferLength: 'A_ARG_TYPE_TransferLength',
	    		          TransferTotal: 'A_ARG_TYPE_TransferTotal'
	    	            } );
	    this.addAction( 'ImportResource',
		                { SourceURI: 'A_ARG_TYPE_URI', DestinationURI: 'A_ARG_TYPE_URI' },
		                { TransferID: 'A_ARG_TYPE_TransferID' } );
	    this.addAction( 'Search',
	    		        { ContainerID: 'A_ARG_TYPE_ObjectID',
	                      SearchCriteria: 'A_ARG_TYPE_SearchCriteria',
	                      Filter: 'A_ARG_TYPE_Filter',
	                      StartingIndex: 'A_ARG_TYPE_Index',
	                      RequestedCount: 'A_ARG_TYPE_Count',
	                      SortCriteria: 'A_ARG_TYPE_SortCriteria' },
	                    { Result: 'A_ARG_TYPE_Result',
	                      NumberReturned: 'A_ARG_TYPE_Count',
	                      TotalMatches: 'A_ARG_TYPE_Count',
	                      UpdateID: 'A_ARG_TYPE_UpdateID' } );
	    this.addAction( 'StopTransferResource', { TransferID: 'A_ARG_TYPE_TransferID' }, null );
	    this.addAction( 'UpdateObject',
	    		        { ObjectID: 'A_ARG_TYPE_ObjectID',
	                      CurrentTagValue: 'A_ARG_TYPE_TagValueList',
	                      NewTagValue: 'A_ARG_TYPE_TagValueList' },
	                    null );
	    
	    this.addVariables( {
	    	'TransferIDs': 'string',
	    	'A_ARG_TYPE_ObjectID': 'string',
	    	'A_ARG_TYPE_Result': 'string',
	    	'A_ARG_TYPE_SearchCriteria': 'string',
	    	'A_ARG_TYPE_BrowseFlag': 'string',
	    	'A_ARG_TYPE_Filter': 'string',
	    	'A_ARG_TYPE_SortCriteria': 'string',
	    	'A_ARG_TYPE_Index': 'ui4',
	    	'A_ARG_TYPE_Count': 'ui4',
	    	'A_ARG_TYPE_UpdateID': 'ui4',
	    	'A_ARG_TYPE_TransferID': 'ui4',
	    	'A_ARG_TYPE_TransferStatus': 'string',
	    	'A_ARG_TYPE_TransferLength': 'string',
	    	'A_ARG_TYPE_TransferTotal': 'string',
	    	'A_ARG_TYPE_TagValueList': 'string',
	    	'A_ARG_TYPE_URI': 'uri',
	    	'SearchCapabilities': 'string',
	    	'SortCapabilities': 'string',
	    	'SystemUpdateID': 'ui4',
	    	'ContainerUpdateIDs': 'string'	    	
	    } );
	}

	/* Optional */
	createObject( inArgs ) {
		this.mLogger.debug( 'createObject' );
	}
	
	/* Optional */
	destroyObject( inArgs ) {
		this.mLogger.debug( 'destroyObject' );
	}
	
	/* Required */
	browse( inArgs, inCallback ) {
		this.mLogger.debug( 'BROWSE:' + inArgs );
		let theResponse;
		this.mLibrary.browse( inArgs.ObjectID, null, ( inError, inResult ) =>
			browseResultToDIDL( this, inResult, inCallback )
		);
	}
	
	/* Optional */
	createReference( inArgs ) {
		this.mLogger.debug( 'createReference' );
	}
	
	/* Optional */
	deleteResource( inArgs ) {
		this.mLogger.debug( 'deleteResource' );
	}
	
	/* Optional */
	exportResource( inArgs ) {
		this.mLogger.debug( 'exportResource' );
	}
	
	/* Required */
	getSearchCapabilities( inArgs ) {
		this.mLogger.debug( 'getSearchCapabilities' );
		/* Search not supported */
		return { SearchCaps: '*' };
	}
	
	/* Required */
	getSortCapabilities( inArgs ) {
		this.mLogger.debug( 'getSortCapabilities' );
	}
	
	/* Required */
	getSystemUpdateID() {
		this.mLogger.debug( 'getSystemUpdateID' );
	}
	
	/* Optional */
	getTransferResource() {
		this.mLogger.debug( 'getTransferResource' );
	}
	
	/* Optional */
	importResource() {
		this.mLogger.debug( 'importResource' );
	}
	
	/* Optional */
	search( inArgs ) {
		this.mLogger.debug( 'search' );
	}
	
	/* Optional */
	stopTransferResource( inArgs ) {
		this.mLogger.debug( 'stopTransferResource' );
	}
	
	/* Optional */
	updateObject( inArgs ) {
		this.mLogger.debug( 'updateObject' );
	}
}

module.exports = ContentDirectoryLocalService;