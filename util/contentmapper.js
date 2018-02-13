/* jshint esversion: 6 */
const PersistentTrack = require( '../persistence/persistenttrack' );

const mapContentToExternalForm = function( inContent ) {
    const theExternalContent = {
        id: inContent.getId(),
        lastModified: inContent.getLastModified(),
        parentId: inContent.getParentId(),
        title: inContent.getTitle(),
        type: inContent.getType()
    };
    if ( inContent instanceof PersistentTrack ) {
        theExternalContent.duration = inContent.getDuration();
        theExternalContent.trackNumber = inContent.getTrackNumber();
    }
    return theExternalContent;
};

exports.mapContentToExternalForm = mapContentToExternalForm;