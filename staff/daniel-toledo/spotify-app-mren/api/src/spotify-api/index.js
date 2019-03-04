'use strict'

/**
 * Spotify API client.
 * 
 * @version 2.1.0
 */
const spotifyApi = {
    token: 'NO-TOKEN',
    clientId: 'NO-CLIENT-ID',
    clientSecret: 'NO-CLIENT-SECRET',

    url: 'https://api.spotify.com/v1',
    url_token: "https://accounts.spotify.com/api/token",

    /**
     * Searches artists.
     * 
     * @param {string} query - The text to match on artists search.
     * @retuns {Promise} - Resolves with artists, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    searchArtists(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}/search?q=${query}&type=artist`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    if (
                        response.error.status === 401 &&
                        response.error.message === "The access token expired"
                    ) {
                        return this.refreshToken(this.searchArtists(query))
                    } else {
                        throw Error(response.error.message)
                    }
                }

                const { artists: { items } } = response

                return items
            })
    },

    /**
     * Retrieves an artist.
     * 
     * @param {string} artistId - The artist to retrieve.
     * @returns {Promise} - Resolves with albums, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveArtist(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`${this.url}/artists/${artistId}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                  if (
                    response.error.status === 401 &&
                    response.error.message === "The access token expired"
                  ) {
                    return this.refreshToken(this.retrieveArtist(artistId))
                  } else {
                    throw Error(response.error.message)
                  }
                }
                return response
            })
    },

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId - The artist to retrieve albums from.
     * @returns {Promise} - Resolves with albums, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveAlbums(artistId) {
        if (typeof artistId !== 'string') throw TypeError(`${artistId} is not a string`)

        if (!artistId.trim().length) throw Error('artistId is empty')

        return fetch(`${this.url}/artists/${artistId}/albums`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                  if (
                    response.error.status === 401 &&
                    response.error.message === "The access token expired"
                  ) {
                    return this.refreshToken(this.retrieveAlbums(artistId))
                  } else {
                    throw Error(response.error.message)
                  }
                }
                return response.items
              })
            // .then(({ items }) => items)
    },

    /**
     * Retrieves an album.
     * 
     * @param {string} albumId - The album to retrieve.
     * @preturns {Promise} - Resolves with tracks, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveAlbum(albumId) {
      debugger
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return fetch(`${this.url}/albums/${albumId}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                  if (
                    response.error.status === 401 &&
                    response.error.message === "The access token expired"
                  ) {
                    return this.refreshToken(this.retrieveAlbum(albumId))
                  } else {
                    throw Error(response.error.message)
                  }
                }
                return response
              })
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId - The album to retrieve tracks from.
     * @preturns {Promise} - Resolves with tracks, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveTracks(albumId) {
        if (typeof albumId !== 'string') throw TypeError(`${albumId} is not a string`)

        if (!albumId.trim().length) throw Error('albumId is empty')

        return fetch(`${this.url}/albums/${albumId}/tracks`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                  if (
                    response.error.status === 401 &&
                    response.error.message === "The access token expired"
                  ) {
                    return this.refreshToken(this.retrieveTracks(albumId))
                  } else {
                    throw Error(response.error.message)
                  }
                }
                return response
              })
            .then(({ items }) => items)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId - The id of the track to be retrieved.
     * @returns {Promise} Resolves with track, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */
    retrieveTrack(trackId) {
        if (typeof trackId !== 'string') throw TypeError(`${trackId} is not a string`)

        if (!trackId.trim().length) throw Error('trackId is empty')

        return fetch(`${this.url}/tracks/${trackId}`, {
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                  if (
                    response.error.status === 401 &&
                    response.error.message === "The access token expired"
                  ) {
                    return this.refreshToken(this.retrieveTrack(trackId))
                  } else {
                    throw Error(response.error.message)
                  }
                }
                return response
              })
    },

    refreshToken(promise) {
        const auth = this.clientId + ":" + this.clientSecret;

        let buff = new Buffer(auth);
        let base64auth = buff.toString("base64");
        const basicAuth = `Basic ${base64auth}`;

        return fetch(`${this.url_token}`, {
            headers: {
                Authorization: basicAuth,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials",
            method: "POST"
        })
            .then(response => response.json())
            .then(response => {

                this.token = response.access_token;
                return promise;
            });
    }
}

module.exports = spotifyApi