/* jshint esversion: 6 */
class JSMediaError {
    constructor( inCode, inMessage, inCause ) {
        this.mCode = inCode;
        this.mMessage = inMessage;
        this.mCause = inCause;
    }

    getCause() {
        return this.mCause;
    }

    getCode() {
        return this.mCode;
    }

    getMessage() {
        return this.mMessage;
    }
}

JSMediaError.Code_Persistence_DBConnect = 0;
JSMediaError.Code_Persistence_DBRootOfRootsCreate = 1;
JSMediaError.Code_Persistence_DBFind = 2;
JSMediaError.Code_Persistence_DBPopulate = 3;

JSMediaError.Code_Backend_InvalidURI = 10;
JSMediaError.Code_Backend_ItemAccess = 11;
JSMediaError.Code_Backend_TagReadError = 12;

JSMediaError.Code_Library_AlbumCreateError = 20;
JSMediaError.Code_Library_ArtistCreateError = 21;
JSMediaError.Code_Library_TrackCreateError = 22;
JSMediaError.Code_Library_BackendCreateError = 23;
JSMediaError.Code_Library_RootsRefreshError = 24;

module.exports = JSMediaError;