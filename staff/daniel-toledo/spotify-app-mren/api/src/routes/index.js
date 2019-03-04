module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),

    searchArtists: require('./search-artists'),
    retrieveAlbums: require('./retrieve-albums'),
    retrieveTracks: require('./retrieve-tracks'),
    retrieveSong: require('./retrieve-song'),

    listComments: require('./list-comments'),
    addComment: require('./add-comment'),
    deleteComment: require('./delete-comment'),
        
    toggleFavoriteSong: require('./favorite-song'),

    notFound: require('./not-found'),
}