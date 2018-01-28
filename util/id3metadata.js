/* jshint esversion: 6 */
class ID3MetaData {
    constructor() {
        this.mAlbum = 'Unknown';
        this.mArtist = 'Unknown';
        this.mDuration = null;
        this.mTitle = 'Unknown';
        this.mTrack = null;
    }

    getAlbum() { return this.mAlbum; }
    getArtist() { return this.mArtist; }
    getDuration() { return this.mDuration; }
    getTitle() { return this.mTitle; }
    getTrack() { return this.mTrack; }
    isValid() { return this.getTitle() && this.getAlbum() && this.getArtist(); }
    setAlbum( inAlbum ) { this.mAlbum = inAlbum; }
    setArtist( inArtist ) { this.mArtist = inArtist; }
    setDuration( inDuration ) { this.mDuration = inDuration; }
    setTitle( inTitle ) { this.mTitle = inTitle; }
    setTrack( inTrack ) { this.mTrack = inTrack; }
}

module.exports = ID3MetaData;