require('dotenv').config()

require('isomorphic-fetch')

const { MongoClient } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const cors =require('cors')
const spotifyApi = require('./spotify-api')
const users = require('./data/users')
const logic = require('./logic')

const { 
    registerUser, 
    authenticateUser, 
    retrieveUser,

    searchArtists, 

    retrieveAlbums,
    addCommentToArtist, 
    listCommentsFromArtist,
    deleteCommentFromArtist, 
    
    retrieveTracks,
    addCommentToAlbum,
    listCommentsFromAlbum,
    deleteCommentFromAlbum, 
 
    retrieveSong,
    toggleFavoriteSong,
    
    notFound 
} = require('./routes')


const { env: { DB_URL, PORT, SPOTIFY_API_TOKEN, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

spotifyApi.token = SPOTIFY_API_TOKEN

MongoClient.connect(DB_URL, { useNewUrlParser: true })
    .then(client => {
        const db = client.db()
        users.collection = db.collection('users')

        spotifyApi.token = SPOTIFY_API_TOKEN
        logic.jwtSecret = JWT_SECRET

        
        const jsonBodyParser = bodyParser.json()
        
        const app = express()
        const router = express.Router()

        app.use(cors())
        app.use('/api', router)

        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user/:id', retrieveUser) 

        router.get('/artists', searchArtists)
        router.get('/albums/:artistId', retrieveAlbums)
        router.get('/tracks/:albumId', retrieveTracks)
        router.get('/song/:songId', retrieveSong)

        router.post('/artist/:artistId/comment', jsonBodyParser, addCommentToArtist)
        router.get('/artist/:artistId/comments', listCommentsFromArtist)
        router.delete('/artist/comment/:commentId', jsonBodyParser, deleteCommentFromArtist)
        
        router.post('/album/:albumId/comment', jsonBodyParser, addCommentToAlbum)
        router.get('/album/:albumId/comments', listCommentsFromAlbum)
        router.delete('/album/comment/:commentId', jsonBodyParser, deleteCommentFromAlbum)

               
        router.put('/song/:songId/favorite', toggleFavoriteSong)

        router.get('*', notFound)

        app.listen(port, () => console.log(`server running on port ${port}`))

    })
    .catch(console.error)