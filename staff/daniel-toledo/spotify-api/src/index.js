require('dotenv').config()

require('isomorphic-fetch')

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const spotifyApi = require('./spotify-api')
const users = require('./data/users')
const logic = require('./logic')

const { registerUser, authenticateUser, retrieveUser, searchArtists, addCommentToArtist, listCommentsFromArtist,  retrieveArtist, retrieveAlbum, retrieveTrack, notFound, toggleFavoriteArtist } = require('./routes')

const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()
        users.collection = db.collection('users')

        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = JWT_SECRET

        const app = express()

        const jsonBodyParser = bodyParser.json()

        const router = express.Router()

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.post('/user/:id', retrieveUser)

        router.get('/artists', searchArtists)

        // TODO add comment to artist
        router.post('/artist/:id/comment', addCommentToArtist)

        // TODO list comments from artist
        router.get('/artist/:id/comment', listCommentsFromArtist)
        
        router.post('/artist/:id/favorite', toggleFavoriteArtist)

        // router.get('/artist/:id', retrieveArtist)

        // router.get('/album/:id', retrieveAlbum)

        // router.get('/track/:id', retrieveTrack)

        app.get('*', notFound)

        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

    })
    .catch(console.error)