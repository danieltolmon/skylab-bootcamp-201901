
import musicApi from '../music-api'

const logic = {
    __userApiToken__: null,

    login(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');
        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password cannot be empty');

        return musicApi.authenticateUser(email, password)
            .then(({token}) => this.__userApiToken__ = token)
    },

    register(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string');
        if (!name.trim().length) throw Error('name cannot be empty');

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');
        if (!surname.trim().length) throw Error('surname cannot be empty');

        if (typeof email !== 'string') throw TypeError(email + ' is not a string');
        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof password !== 'string') throw TypeError(password + ' is not a string');
        if (!password.trim().length) throw Error('password cannot be empty');

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string');
        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty');

        return musicApi.register(name, surname, email, password, passwordConfirm)
    },

    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return musicApi.authenticateUser(email, password)
            .then(token => this.__userApiToken__ = token)
    },

    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    logOutUser() {
        this.__userApiToken__ = null
    },

    retrieveUser(token) {

        if (typeof token !== 'string') throw TypeError(token + ' is not a string');
        if (!token.trim().length) throw Error('token cannot be empty');

        return musicApi.retrieveUser(token)
    },

    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return musicApi.searchArtists(query)
    },

    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        return musicApi.retrieveAlbums(artistId)
    },

    listCommentsArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        return musicApi.retrieveCommentsArtist(artistId)
    },

    listCommentsAlbum(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)
        if (!albumId.trim().length) throw Error('albumId is empty')

        return musicApi.retrieveCommentsAlbum(albumId)
    },

    addCommentArtist(artistId, token, text) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)
        if (!artistId.trim().length) throw Error('artistId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return musicApi.addCommentArtist(artistId, token, text)
    },

    addCommentAlbum(albumId, token, text) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)
        if (!albumId.trim().length) throw Error('albumId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return musicApi.addCommentAlbum(albumId, token, text)
    },

    deleteCommentAlbum(commentId, token) {
        if (typeof commentId !== 'string') throw TypeError(`${commentId} is not a string`)
        if (!commentId.trim().length) throw Error('commentId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return musicApi.deleteCommentAlbum(commentId, token)
    },

    deleteCommentArtist(commentId, token) {
        if (typeof commentId !== 'string') throw TypeError(`${commentId} is not a string`)
        if (!commentId.trim().length) throw Error('commentId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return musicApi.deleteCommentArtist(commentId, token)
    },

    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)
        if (!albumId.trim().length) throw Error('albumId is empty')

        return musicApi.retrieveTracks(albumId)
    },

    retrieveSong(songId) {
        if (typeof songId !== 'string') throw TypeError(`${songId} is not a string`)
        if (!songId.trim().length) throw Error('songId is empty')

        return musicApi.retrieveSong(songId)
    },

    toggleFavorite(trackId, email, callback) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string');

        if (!email.trim().length) throw Error('email cannot be empty');

        if (typeof trackId !== 'string') throw TypeError(trackId + ' is not a string');

        if (!trackId.trim().length) throw Error('trackId cannot be empty');


        // User.findOne(user => {
        //     if (email === user.email) {

        //         var index = user.favorite.indexOf(trackId)

        //         if (index === -1) user.favorite.push(trackId)
        //         else user.favorite.splice(index, 1)

        //         callback(user.favorite)

        //     }
        // })
    },
}

export default logic