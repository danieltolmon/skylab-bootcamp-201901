require('dotenv').config()

require('isomorphic-fetch')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const spotifyApi = require('./spotify-api')
const logic = require('./logic')
const mongoose = require('mongoose')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper

const {
    registerUser,
    authenticateUser,
    retrieveUser,

    searchArtists,
    retrieveAlbums,
    retrieveTracks,
    retrieveSong,

    addComment,
    listComments,
    deleteComment,

    toggleFavoriteSong,

    notFound

} = require('./routes')


const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET, CLIENT_ID, CLIENT_SECRET }, argv: [, , port = PORT || 8080] } = process


mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {

        spotifyApi.token = SPOTIFY_API_TOKEN
        spotifyApi.clientId = CLIENT_ID
        spotifyApi.clientSecret = CLIENT_SECRET
        tokenHelper.jwtSecret = JWT_SECRET

        const jsonBodyParser = bodyParser.json()

        const app = express()
        const router = express.Router()

        app.use(cors())
        app.use('/api', router)

        router.post('/user', jsonBodyParser, registerUser)
        router.post('/user/auth', jsonBodyParser, authenticateUser)
        router.get('/user',  tokenVerifierMiddleware, retrieveUser)

        router.get('/artists', searchArtists)
        router.get('/albums/:artistId', retrieveAlbums)
        router.get('/tracks/:albumId', retrieveTracks)
        router.get('/song/:songId', retrieveSong)

        router.post('/:target/:targetId/comment', jsonBodyParser, tokenVerifierMiddleware, addComment)
        router.get('/:target/:targetId/comments', listComments)
        router.delete('/:target/comment/:commentId', tokenVerifierMiddleware, deleteComment)

        router.put('/song/:songId/favorite', toggleFavoriteSong)

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))
    
    })
    .catch(error => console.error(error))