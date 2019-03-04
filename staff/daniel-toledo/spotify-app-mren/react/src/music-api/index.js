'use strict'

const musicApi = {

    url: `http://localhost:8000/api`,

    authenticateUser(email, password) {
        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(user => {
                if (!user.error) return user

                else throw Error(user.error)
            })

    },

    register(name, surname, email, password, passwordConfirm) {
        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())

            .then(({ id, error }) => {

                if (!error) return id

                else throw Error(error)
            })
    },

    retrieveUser(token) {
        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())

            .then(user => {

                if (!user.error) return user

                else throw Error(user.error)
            })
    },

    searchArtists(query) {

        return fetch(`${this.url}/artists?q=${query}`)
            .then(response => response.json())
    },

    addCommentArtist(artistId, token, text) {
        return fetch(`${this.url}/artist/${artistId}/comment`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
    },

    retrieveCommentsArtist(artistId) {
        return fetch(`${this.url}/artist/${artistId}/comments`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
    },

    deleteCommentArtist(commentId, token) {
        return fetch(`${this.url}/artist/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
    },

    retrieveAlbums(artistId) {
        return fetch(`${this.url}/albums/${artistId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
    },

    addCommentAlbum(albumId, token, text) {

        return fetch(`${this.url}/album/${albumId}/comment`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
            .then(response => response.json())
    },

    retrieveCommentsAlbum(albumId) {

        return fetch(`${this.url}/album/${albumId}/comments`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
    },

    deleteCommentAlbum(commentId, token) {
        return fetch(`${this.url}/album/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
    },

    retrieveTracks(albumId) {
     
        return fetch(`${this.url}/tracks/${albumId}`)
            .then(response => response.json())
    },

    retrieveSong(songId) {
        return fetch(`${this.url}/song/${songId}`)
            .then(response => response.json())
    }
}

export default musicApi