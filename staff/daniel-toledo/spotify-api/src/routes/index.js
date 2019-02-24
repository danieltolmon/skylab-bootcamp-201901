module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),

    // retriveArtist: require('./retrieve-artist'),

    // retriveAlbum: require('./retrieve-album'),

    // retireveTrack: require('./retrieve-track'),

    // TODO other route handlers
    toggleFavoriteArtist: require('./favorite-artist'),

    listCommentsFromArtist: require('./list-comments-from-artist'),

    addCommentToArtist: require('./add-comment-to-artist'),

    notFound: require('./not-found'),

}