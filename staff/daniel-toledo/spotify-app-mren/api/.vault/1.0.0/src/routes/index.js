module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),
    retrieveAlbums: require('./retrieve-albums'),
    retrieveTracks: require('./retrieve-tracks'),
    retrieveSong: require('./retrieve-song'),

    listCommentsFromArtist: require('./list-comments-from-artist'),
    addCommentToArtist: require('./add-comment-to-artist'),
    deleteCommentFromArtist: require('./delete-comment-from-artist'),

    listCommentsFromAlbum: require('./list-comments-from-album'),
    addCommentToAlbum: require('./add-comment-to-album'),
    deleteCommentFromAlbum: require('./delete-comment-from-album'),
        
    toggleFavoriteSong: require('./favorite-song'),

    notFound: require('./not-found'),
}