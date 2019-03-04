'use strict'

require('dotenv').config()

const spotifyApi = require('../spotify-api')
const users = require('../data/users')
const artistComments = require('../data/artist-comments')
const albumComments = require('../data/album-comments')
const jwt = require('jsonwebtoken')
const { env: { SECRET_JSON } } = process

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return users.add({name, surname, email, password})
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return users.findByEmail(email)
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)
                if (user.password !== password) throw Error('wrong credentials')
                const userId = user.id
                const secret = SECRET_JSON
                const token = jwt.sign({
                    data: userId
                }, secret, { expiresIn: '48h' })
                return { id: userId, token }
            })
    },

    retrieveUser(userId, token) {

        // if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        // if (!userId.trim().length) throw Error('userId cannot be empty')

        // if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        // if (!token.trim().length) throw Error('token cannot be empty')

        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        return users.findByUserId(userId)
            .then(({ id, name, surname, email, favoriteArtists = [], favoriteAlbums = [], favoriteTracks = [] }) => ({
                id: id.toString(),
                name,
                surname,
                email,
                favoriteArtists,
                favoriteAlbums,
                favoriteTracks
            }))
    },

    updateUser(userId, token, data) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return users.update(userId, data)

    },

    removeUser(userId, token) {

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)

        if (!token.trim().length) throw Error('token cannot be empty')
        
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw Error('userId cannot be empty')

        return users.remove(userId)
    },

    /**
     * Search artists.
     * 
     * @param {string} query 
     * @returns {Promise}
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return spotifyApi.searchArtists(query)
    },

    /**
     * Retrieves an artist.
     * 
     * @param {string} artistId 
     */
    retrieveArtist(artistId, userId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveArtist(artistId)
            .then(artist =>
                artistComments.find({ artistId: artist.id })
                    .then(comments => artist.comments = comments)
                    .then(()=>users.findByUserId(userId))
                    .then( user => {
                        if (user.favoriteArtist) return artist.favorite= user.favoriteArtist.find(favorite=> favorite===artistId)
                        else return 
                    })
                    .then(() => artist)
            )

    },

    toggleFavoriteArtist(userId, token, artistId) {

        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)      
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')  
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof artistId !== 'string') throw TypeError(`artistId should be a string`)

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteArtist = [] } = user

                const index = favoriteArtist.findIndex(_artistId => _artistId === artistId)

                if (index < 0) favoriteArtist.push(artistId)
                else favoriteArtist.splice(index, 1)

                return users.update(userId, { favoriteArtist })
            })
    },

    /**
     * Toggles a artist from non-favorite to favorite, and viceversa.
     * 
     * @param {string} artistId - The id of the artist to toggle in favorites.
     */
    toggleFavoriteSong(userId, token, songId) {

        if (typeof userId !== 'string') throw TypeError(`userId should be a string`)      
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        
        if (!token.trim().length) throw Error('token cannot be empty')  
        if (jwt.verify(token, SECRET_JSON).data !== userId) throw Error('Incorrect token')

        if (typeof songId !== 'string') throw TypeError(`songId should be a string`)

        return users.findByUserId(userId)
            .then(user => {
                const { favoriteSongs = [] } = user

                const index = favoriteSongs.findIndex(_songId => _songId === songId)

                if (index < 0) favoriteSongs.push(songId)
                else favoriteSongs.splice(index, 1)

                return users.update(userId, { favoriteSongs })
            })
    },

    addCommentToArtist(userId, token, artistId, text) {
        // TODO validate userId, token, artistId and text

        const comment = {
            userId,
            artistId,
            text,
            date: new Date
        }

        return users.findByUserId(userId)
            .then(() => artistComments.add(comment))
            .then(() => comment.id)
    },

    listCommentsFromArtist(artistId) {
        // TODO artistId

        return artistComments.find({ artistId })
    },

    deleteCommentFromArtist(userId, token, commentId) {
        //TODO validations
        debugger
        return artistComments.retrieve(commentId)
            .then(comment => {
                if (comment.userId === userId) artistComments.remove(commentId)
                else throw Error('user is not allowed to delete comment')
            } )

    },

    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    },

    addCommentToAlbum(userId, token, albumId, text){
         // TODO validate userId, token, artistId and text

         const comment = {
            userId,
            albumId,
            text,
            date: new Date
        }

        return users.findByUserId(userId)
            .then(() => albumComments.add(comment))
            .then(() => comment.id)
    },

    listCommentsFromAlbum(albumId) {
        // TODO albumId

        return albumComments.find({ albumId })
    },

    deleteCommentFromAlbum(userId, token, commentId) {
        //TODO validations
        debugger
        return albumComments.retrieve(commentId)
            .then(comment => {
                if (comment.userId === userId) albumComments.remove(commentId)
                else throw Error('user is not allowed to delete comment')
            } )

    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveAlbum(albumId)
    },

    retrieveSong(songId) {
        if (typeof songId !== 'string') throw TypeError(`${songId} is not a string`)

        if (!songId.trim().length) throw Error('songId is empty')

        return spotifyApi.retrieveTrack(songId)
    },

    /**
     * Toggles a album from non-favorite to favorite, and viceversa.
     * 
     * @param {string} albumId - The id of the album to toggle in favorites.
     */
    toggleFavoriteAlbum(userId, albumId) {
        debugger
        return users.findByUserId(userId)
            .then(user => {
                const { favoriteAlbums = [] } = user

                const index = favoriteAlbums.findIndex(_albumId => _albumId === albumId)

                if (index < 0) favoriteAlbums.push(albumId)
                else favoriteAlbums.splice(index, 1)

                return users.update(userId, { favoriteAlbums })
            })
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId 
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return spotifyApi.retrieveTrack(trackId)
    },

    /**
     * Toggles a track from non-favorite to favorite, and viceversa.
     * 
     * @param {string} trackId - The id of the track to toggle in favorites.
     */
    toggleFavoriteTrack(userId, trackId) {
        return users.findByUserId(userId)
            .then(user => {
                const { favoriteTracks = [] } = user

                const index = favoriteTracks.findIndex(_trackId => _trackId === trackId)

                if (index < 0) favoriteTracks.push(trackId)
                else favoriteTracks.splice(index, 1)

                return users.update(userId, { favoriteTracks })
            })
    }
}

module.exports = logic