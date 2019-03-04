'use strict'

require('dotenv').config()

const spotifyApi = require('../spotify-api')
const jwt = require('jsonwebtoken')
const { User, Comment } = require('../models')
const mongoose = require('mongoose')
const { Types: { ObjectId } } = mongoose
const bcrypt = require('bcrypt')

const { env: { SECRET_JSON } } = process

/**
 * Abstraction of business logic.
 */
const logic = {

    //----------------USERS--------------------//
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

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
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

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return { id: user.id }
        })()
    },

    retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findByIdAndUpdate(userId, data)

    },

    removeUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findByIdAndDelete(userId)
    },

    //----------------SPOTIFY--------------------//

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
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveArtist(artistId)
        // .then(artist =>
        //     Comment.findOne({ artistId: artist.id })
        //         .then(comments => {
        //             artist.comments = []
        //             return artist.comments.push(comments)
        //         })
        //         .then(() => User.findById(userId))
        //         .then(user => {
        //             if (user.favoriteArtist) return artist.favorite = user.favoriteArtist.find(favorite => favorite === artistId)
        //             else return
        //         })
        //         .then(() => artist)
        // )

    },

    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return spotifyApi.retrieveAlbums(artistId)
    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId 
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return spotifyApi.retrieveTracks(albumId)
    },

    retrieveSong(songId) {
        if (typeof songId !== 'string') throw TypeError(`${songId} is not a string`)

        if (!songId.trim().length) throw Error('songId is empty')

        return spotifyApi.retrieveTrack(songId)
    },

    //----------------COMMENTS--------------------//

    addComment(userId, target, targetId, text) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof target !== 'string') throw TypeError(target + ' is not a string')
        if (!target.trim().length) throw Error('target cannot be empty')

        if (typeof targetId !== 'string') throw TypeError(targetId + ' is not a string')
        if (!targetId.trim().length) throw Error('targetId cannot be empty')

        if (typeof text !== 'string') throw TypeError(text + ' is not a string')
        if (!text.trim().length) throw Error('text cannot be empty')

        const comment = {
            user: userId,
            targetId,
            target,
            text,
            date: new Date
        }

        return (async () => {
        
            const { id } = await Comment.create(comment)
            debugger
            return id
        })()

    },

    listComments(target, targetId) {
        if (typeof target !== 'string') throw TypeError(target + ' is not a string')
        if (!target.trim().length) throw Error('target cannot be empty')

        if (typeof targetId !== 'string') throw TypeError(targetId + ' is not a string')
        if (!targetId.trim().length) throw Error('targetId cannot be empty')

        return Comment.find({ target, targetId })
            .then(comments => {
                comments.forEach(comment => comment.id = comment._id)
                return comments
            })
    },

    deleteComment(userId, commentId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return Comment.findOne({ _id: ObjectId(commentId) })
            .then(comment => {

                if (comment._doc.user.toString() === userId) return Comment.deleteOne({ _id: ObjectId(commentId) })
                else throw Error('user is not allowed to delete comment')
            })
            .catch(error => { throw error })
    },

    //----------------FAVORITES--------------------//

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