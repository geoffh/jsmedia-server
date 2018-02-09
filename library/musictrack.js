/* jshint esversion: 6 */
class MusicTrack {
    constructor() {}

    getAlbum() {
        return this.mAlbum;
    }

    getArtist() {
        return this.mArtist;
    }

    getBitRate() {
        return this.mBitRate;
    }

    getDuration() {
        return this.mDuration;
    }

    getLastModified() {
        return this.mLastModified;
    }

    getProtocolInfo() {
        return this.mProtocolInfo;
    }
    
    getTitle() {
        return this.mTitle;
    }

    getTrackNumber() {
        return this.mTrackNumber;
    }

    getUri() {
        return this.mUri;
    }
    
    setAlbum( inAlbum ) {
        this.mAlbum = inAlbum;
        return this;
    }

    setArtist( inArtist ) {
        this.mArtist = inArtist;
        return this;
    }

    setBitRate( inBitRate ) {
        this.mBitRate = inBitRate;
        return this;
    }

    setDuration( inDuration ) {
        this.mDuration = inDuration;
        return this;
    }

    setLastModified( inLastModified ) {
        this.mLastModified = inLastModified;
        return this;
    }

    setProtocolInfo( inProtocolInfo ) {
        this.mProtocolInfo = inProtocolInfo;
        return this;
    }

    setTitle( inTitle ) {
        this.mTitle = inTitle;
        return this;
    }

    setTrackNumber( inTrackNumber ) {
        this.mTrackNumber = parseInt( inTrackNumber );
        return this;
    }

    setUri( inUri ) {
        this.mUri = inUri;
        return this;
    }
}

module.exports = MusicTrack;