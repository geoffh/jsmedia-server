/* jshint esversion: 6 */
const RemoteService = require( './remoteservice' );
const ServiceTypes = require( '../devicetypes' ).ServiceTypes;

class ContentDirectoryRemoteService extends RemoteService {
	constructor( inServiceDescription, inServiceFunctions ) {
		super( ServiceTypes.ContentDirectory, inServiceDescription.USN, inServiceFunctions );
	}
	
	/* Required */
	browse( inObjectId, inBrowseFlag, inFilter, inStartingIndex, inRequestedCount, inSortCriteria, inCallback ) {
		const theOptions = {
			ObjectId: inObjectId,
			BrowseFlag: inBrowseFlag,
			Filter: inFilter,
			StartingIndex: inStartingIndex,
			RequestedCount: inRequestedCount,
			SortCriteria: inSortCriteria
		};
		this.execute( this.getServiceFunctions().Browse, theOptions, inCallback );
	}
	
	/* Optional */
	createObject( inContainerID, inElements, inCallback ) {
		const theOptions = { ContainerID: inContainerID, Elements: inElements };
		this.execute( this.getServiceFunctions().CreateObject, theOptions, inCallback );
	}
	
	/* Optional */
	createReference( inContainerID, inObjectID, inCallback ) {
		const theOptions = { ContainerID: inContainerID, ObjectID: inObjectID };
		this.execute( this.getServiceFunctions().CreateReference, theOptions, inCallback );
	}
	
	/* Optional */
	deleteResource( inResourceURI, inCallback ) {
		const theOptions = { ResourceURI: inResourceURI };
		this.execute( this.getServiceFunctions().DeleteResource, theOptions, inCallback );
	}
	
	/* Optional */
	destroyObject( inObjectID, inCallback ) {
		const theOptions = { ObjectID: inObjectID };
		this.execute( this.getServiceFunctions().DestroyObject, theOptions, inCallback );
	}
	
	/* Optional */
	exportResource( inSourceURI, inDestinationURI, inCallback ) {
		const theOptions = { SourceURI: inSourceURI, DestinationURI: inDestinationURI };
		this.execute( this.getServiceFunctions().ExportResource, theOptions, inCallback );
	}
	
	/* Required */
	getSearchCapabilities( inCallback ) {
		this.execute( this.getServiceFunctions().GetSearchCapabilities, null, inCallback );
	}
	
	/* Required */
	getSortCapabilities( inCallback ) {
		this.execute( this.getServiceFunctions().GetSortCapabilities, null, inCallback );
	}
	
	/* Required */
	getSystemUpdateID( inCallback ) {
		this.execute( this.getServiceFunctions().GetSystemUpdateID, null, inCallback );
	}
	
	/* Optional */
	getTransferProgress( inTransferID, inCallback ) {
		const theOptions = { TransferID: inTransferID };
		this.execute( this.getServiceFunctions().GetTransferProgress, theOptions, inCallback );
	}
	
	/* Optional */
	importResource( inSourceURI, inDestinationURI, inCallback ) {
		const theOptions = { SourceURI: inSourceURI, DestinationURI: inDestinationURI };
		this.execute( this.getServiceFunctions().ImportResource, theOptions, inCallback );
	}
	
	/* Optional */
	search( inContainerID, inSearchCriteria, inFilter, inStartingIndex, inRequestedCount, inSortCriteria, inCallback ) {
		const theOptions = {
			ObjectId: inContainerID,
			Filter: inFilter,
			StartingIndex: inStartingIndex,
			RequestedCount: inRequestedCount,
			SortCriteria: inSortCriteria
		};
		this.execute( this.getServiceFunctions().Search, theOptions, inCallback );
	}
	
	/* Optional */
	stopTransferResource( inTransferID, inCallback ) {
		const theOptions = { TransferID: inTransferID };
		this.execute( this.getServiceFunctions().StopTransferResource, theOptions, inCallback );
	}
	
	/* Optional */
	updateObject( inObjectId, inCurrentTagValue, inNewTagValue, inCallback ) {
		const theOptions = {
			ObjectId: inObjectId,
			CurrentTagValue: inCurrentTagValue,
			NewTagValue: inNewTagValue
		};
		this.execute( this.getServiceFunctions().UpdateObject, theOptions, inCallback );
	}
}

module.exports = ContentDirectoryRemoteService;