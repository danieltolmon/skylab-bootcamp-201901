import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'

import Home from '../Home'
import Login from '../Login'
import Nav from '../Nav'
import NavResults from '../NavResults'
import Albums from '../Albums'
import Artists from '../Artists'
import Play from '../Play'
import Tracks from '../Tracks'
import Register from '../Register'

import logic from '../../logic'
import './index.sass'

class App extends React.Component {
    state = {
        userFavorite: [],
        userName: null,
        searchFeedback: '',
        songVisual: false,
        logoutButtonVisual: false,
        searchNavVisual: false,
        navResultsVisual: false,
        albumImage: '',
        albumButtonVisual: false,
        trackButtonVisual: false,
        artistId: null,
        commentsArtist: null,
        commentsAlbum: null,
        loginFeedback: '',
        registerFeedback: '',
        logoutFeedback: ''
    }

    handleLogin = (email, password) => {

        try {
            logic.login(email, password)
                .then(() => {
                    const token = sessionStorage.getItem('__userApiToken__')
                    return logic.retrieveUser(token)
                })
                .then(user => this.setState({
                    userName: user.name,
                    logoutButtonVisual: true,
                    loginFeedback: ''
                },
                    () => this.props.history.push('/home')))
                .catch(error => this.setState({ loginFeedback: error.message }))

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }

    }

    handleRegister = (name, surname, email, password, passwordConfirm) => {

        try {
            logic.register(name, surname, email, password, passwordConfirm)
                .then(() => this.setState({
                    registerFeedback: ''
                },
                    () => this.props.history.push('/')

                ))
                .catch(error => this.setState({ registerFeedback: error.message }))

        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }

    }

    handleLogout = async () => {
        try {
            await logic.logOutUser()
            this.setState({
                logoutButtonVisual: false,
                navResultsVisual: false,
                searchNavVisual: false
            },
                () => this.props.history.push('/'))

        } catch ({ message }) {
            this.setState({ logoutFeedback: message })
        }

    }

    handleLogintoRegister = () => { this.props.history.push('/register') }

    handleRegistertoLogin = () => { this.props.history.push('/') }

    handleSearch = query => {
        try {
            logic.searchArtists(query)
                .then(artists => this.setState({
                    query,
                    artists,
                    navResultsVisual: true,
                    searchNavVisual: true
                },
                    () => this.props.history.push(`/search`)))

        } catch ({ message }) {
            this.setState({ searchFeedback: message })
        }
    }

    handleArtistButton = () => {
        this.setState({
            albumButtonVisual: false,
            trackButtonVisual: false
        },
            () => this.props.history.push(`/search`))
    }

    handleAlbumButton = () => {
        this.setState({
            albumButtonVisual: true,
            trackButtonVisual: false
        },
            () => this.props.history.push(`/artist`))
    }

    handleArtistId = (id) => {
        this.setState({ artistId: id })

        try {
            logic.listCommentsArtist(id)
                .then(comments => this.setState({ commentsArtist: comments }))
                .then(() => logic.retrieveAlbums(id))
                .then(albums => this.setState({
                    artistId: id,
                    albums,
                    albumButtonVisual: true
                },
                    () => this.props.history.push(`/artist`)))
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
                .then(tracks => this.setState({
                    tracks,
                    albumImage,
                    trackButtonVisual: true
                },
                    () => this.props.history.push(`/album`)))
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
        const { state: { albumId } } = this

        try {
            const token = sessionStorage.getItem('__userApiToken__')

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
            <Nav logoutButtonVisual={this.state.logoutButtonVisual} searchNavVisual={this.state.searchNavVisual} onLogout={this.handleLogout} onSearch={this.handleSearch} feedback={this.state.searchFeedback} />
            {this.state.navResultsVisual && < NavResults artistButton={this.handleArtistButton} albumButton={this.handleAlbumButton} albumButtonVisual={this.state.albumButtonVisual} trackButtonVisual={this.state.trackButtonVisual} />}
            <Route exact path="/" render={() => <Login onLogin={this.handleLogin} loginToRegister={this.handleLogintoRegister} feedback={this.state.loginFeedback} />} />
            <Route path="/register" render={() => <Register onRegister={this.handleRegister} registerToLogin={this.handleRegistertoLogin} feedback={this.state.registerFeedback} />} />
            <Route path="/home" render={() => < Home onSearch={this.handleSearch} feedback={this.state.searchFeedback} userName={this.state.userName} />} />
            <Route path="/search" render={() => < Artists getArtistId={this.handleArtistId} artists={this.state.artists} />} />
            <Route path="/artist" render={() => < Albums getAlbumId={this.handleAlbumId} albums={this.state.albums} commentsArtist={this.state.commentsArtist} addComment={this.handleAddCommentArtist} deleteComment={this.handleDeleteCommentArtist} userName={this.state.userName} />} />
            {this.state.songVisual && < Play song={this.state.song} favorite={this.handleFavorite} userFavorite={this.state.userFavorite} />}
            <Route path="/album" render={() => < Tracks getTrackId={this.handleTrackId} tracks={this.state.tracks} image={this.state.albumImage} commentsAlbum={this.state.commentsAlbum} addComment={this.handleAddCommentAlbum} deleteComment={this.handleDeleteCommentAlbum} userName={this.state.userName} />} />

        </main>

    }
}

export default withRouter(App)
