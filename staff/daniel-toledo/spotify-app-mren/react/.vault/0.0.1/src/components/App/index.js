import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Home from '../Home'
import Login from '../Login'
import Nav from '../Nav'
import NavResults from '../NavResults'
import Albums from '../Albums'
import Artists from '../Artists'
import NetworkFeedback from '../NetworkFeedback'
import Play from '../Play'
import Tracks from '../Tracks'
import Register from '../Register'

import logic from '../../logic'

import '../../index.sass'


class App extends React.Component {
    state = {
        registerVisual: false,
        userFavorite: [],
        favoriteIsMarked: false,
        userName: null,
        networkFeedbackVisual: false,
        searchFeedback: '',
        artistsVisual: false,
        albumsVisual: false,
        homeVisual: false,
        tracksVisual: false,
        songVisual: false,
        loginVisual: true,
        logoutButtonVisual: false,
        artistVisual: false,
        searchNavVisual: false,
        navResultsVisual: false,
        albumImage: '',
        albumButtonVisual: false,
        trackButtonVisual: false,
        artistId: null,
        commentsArtist: null,
        commentsAlbum: null
    }

    handleLogin = (email, password) => {

        try {
            logic.login(email, password)
                .then(() => {
                    const token = sessionStorage.getItem('__userApiToken__')
                    return logic.retrieveUser(token)
                })
                .then(user => this.setState({ userName: user.name, homeVisual: true, loginVisual: false, logoutButtonVisual: true, loginFeedback: '' }))
                .catch(error => this.setState({ loginFeedback: error.message }))

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }

    }

    handleRegister = (name, surname, email, password, passwordConfirm) => {

        try {
            logic.register(name, surname, email, password, passwordConfirm)
                .then(() => this.setState({ homeVisual: false, loginVisual: true, logoutButtonVisual: false, loginFeedback: '' }))
                .catch(error => this.setState({ registerFeedback: error.message }))

        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }

    }

    handleLogout = async () => {
        try {
            await logic.logOutUser()
            this.setState({ networkFeedbackVisual: false, homeVisual: false, navResultsVisual: false, searchNavVisual: false, logoutButtonVisual: false, loginVisual: true, albumButtonVisual: false, trackButtonVisual: false, artistsVisual: false, albumsVisual: false, tracksVisual: false, songVisual: false })

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }


    }

    handleLogintoRegister = () => {
        this.setState({ loginVisual: false, registerVisual: true })
    }

    handleRegistertoLogin = () => {
        this.setState({ loginVisual: true, registerVisual: false })
    }

    handleSearchHome = query => {
        try {
            logic.searchArtists(query)
                .then(artists => this.setState({ networkFeedbackVisual: false, homeVisual: false, artists: artists, artistsVisual: true, searchNavVisual: true, navResultsVisual: true }))

        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleSearchNav = query => {
        try {
            logic.searchArtists(query)
                .then(artists => this.setState({ artists, artistsVisual: true, albumsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: false, trackButtonVisual: false }))

        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleArtistButton = () => {
        this.setState({ albumsVisual: false, artistsVisual: true, tracksVisual: false, songVisual: false, albumButtonVisual: false, trackButtonVisual: false })
    }

    handleAlbumButton = () => {
        this.setState({ albumsVisual: true, artistsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: true, trackButtonVisual: false })
    }

    handleArtistId = (id) => {
        this.setState({ artistId: id })

        try {
            logic.listCommentsArtist(id)
                .then(comments => this.setState({ commentsArtist: comments }))
                .then(() => logic.retrieveAlbums(id))
                .then(albums => this.setState({ albums, albumsVisual: true, artistsVisual: false, tracksVisual: false, songVisual: false, albumButtonVisual: true }))
                .catch(({ message }) => console.error(message))

        } catch ({ message }) {
            console.error(message)
        }
    }

    handleAddCommentArtist = (text) => {
        const { state: { artistId } } = this

        try {
            const token = sessionStorage.getItem('__userApiToken__')
            logic.addCommentArtist(artistId, token, text)
                .then(() => logic.listCommentsArtist(artistId))
                .then(comments => this.setState({ commentsArtist: comments }))
                .catch(({ message }) => console.error(message))

        } catch ({ message }) {
            console.error(message)
        }
    }

    handleDeleteCommentArtist = commentId => {
        const { state: { artistId } } = this

        try {
            const token = sessionStorage.getItem('__userApiToken__')
            debugger
            logic.deleteCommentArtist(commentId, token)
                .then(() => logic.listCommentsArtist(artistId))
                .then(comments => this.setState({ commentsArtist: comments }))
                .catch(({ message }) => console.error(message))

        } catch ({ message }) {
            console.error(message)
        }
    }

    handleAlbumId = (id, albumImage) => {

        this.setState({ albumId: id })

        try {
            logic.listCommentsAlbum(id)
                .then(comments => this.setState({ commentsAlbum: comments }))
                .then(() => logic.retrieveTracks(id))
                .then(tracks => this.setState({ tracks, albumImage, albumsVisual: false, artistsVisual: false, tracksVisual: true, songVisual: false, albumButtonVisual: true, trackButtonVisual: true }))
                .catch(({ message }) => console.error(message))

        } catch ({ message }) {
            console.error(message)
        }
    }

    handleAddCommentAlbum = (text) => {
        const { state: { albumId } } = this

        try {
            const token = sessionStorage.getItem('__userApiToken__')
            logic.addCommentAlbum(albumId, token, text)
                .then(() => logic.listCommentsAlbum(albumId))
                .then(comments => this.setState({ commentsAlbum: comments }))
                .catch(({ message }) => console.error(message))
        } catch ({ message }) {
            console.error(message)
        }
    }

    handleDeleteCommentAlbum = commentId => {
        const { state: {albumId}  } = this

        try {
            const token = sessionStorage.getItem('__userApiToken__')
            debugger
            logic.deleteCommentAlbum(commentId, token)
                .then(() => logic.listCommentsAlbum(albumId))
                .then(comments => this.setState({ commentsAlbum: comments }))
                .catch(({ message }) => console.error(message))

        } catch ({ message }) {
            console.error(message)
        }
    }

    handleTrackId = (id) => {

        try {
            logic.retrieveSong(id)
                .then(song => this.setState({ song, albumsVisual: false, artistsVisual: false, tracksVisual: true, songVisual: true, favoriteIsMarked: false }))
                .catch(({ message }) => console.error(message))

        } catch (error) {
            console.error(error)
        }
    }


    handleFavorite = (trackId) => {
        const { state: { userMail } } = this
        logic.toggleFavorite(trackId, userMail, userFavorite => {
            console.log('favorites', userFavorite)
            this.setState({ userFavorite })
        })

    }

    render() {

        return <main className="app">
            <Nav logoutButtonVisual={this.state.logoutButtonVisual} searchNavVisual={this.state.searchNavVisual} onLogout={this.handleLogout} onSearch={this.handleSearchNav} feedback={this.state.searchFeedback} />
            {this.state.navResultsVisual && < NavResults artistButton={this.handleArtistButton} albumButton={this.handleAlbumButton} albumButtonVisual={this.state.albumButtonVisual} trackButtonVisual={this.state.trackButtonVisual} />}
            {this.state.loginVisual && <Login onLogin={this.handleLogin} loginToRegister={this.handleLogintoRegister} feedback={this.state.loginFeedback} />}
            {this.state.registerVisual && <Register onRegister={this.handleRegister} registerToLogin={this.handleRegistertoLogin} />}
            {this.state.homeVisual && < Home onSearch={this.handleSearchHome} feedback={this.state.searchFeedback} />}
            {this.state.artistsVisual && < Artists getArtistId={this.handleArtistId} artists={this.state.artists} />}
            {this.state.albumsVisual && < Albums getAlbumId={this.handleAlbumId} albums={this.state.albums} commentsArtist={this.state.commentsArtist} addComment={this.handleAddCommentArtist} deleteComment={this.handleDeleteCommentArtist} userName={this.state.userName} />}
            {this.state.songVisual && < Play song={this.state.song} favorite={this.handleFavorite} userFavorite={this.state.userFavorite} />}
            {this.state.tracksVisual && < Tracks getTrackId={this.handleTrackId} tracks={this.state.tracks} image={this.state.albumImage} commentsAlbum={this.state.commentsAlbum} addComment={this.handleAddCommentAlbum} deleteComment={this.handleDeleteCommentAlbum} userName={this.state.userName}/>}

        </main>

    }
}

export default App;
