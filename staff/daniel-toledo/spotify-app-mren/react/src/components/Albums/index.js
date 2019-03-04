import React from 'react'
import Comments from '../Comments'

import './index.sass'

class Albums extends React.Component {
    state = { text: ''}
    textarea = React.createRef();

    handleComment = event => this.setState({ text: event.target.value })

    handleFormComment = event => {
        event.preventDefault()

        const { state: { text }, props: { addComment } } = this

        this.refs.textarea.value = ''
        this.setState({ text: '' })

        addComment(text)
    }

    handleDeleteComment = commentId => {
        this.props.deleteComment(commentId)
    }


    render() {
        const { props: { albums, getAlbumId, commentsArtist} } = this


        return <section className="results container p-3">
         <h2 className='text-center artist'>{albums[0].artists[0].name}</h2>
         <h3 classNme='pt-5'>Albums</h3>
            <ul className="row container">
                {
                    albums.map(artist => {
                        const image = artist.images[0] ? artist.images[0].url : 'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
                        return <div key={artist.id} style={{ cursor: 'pointer' }} onClick={() => getAlbumId(artist.id, image)} data-id={artist.id} class="card col-12 col-sm-6 col-md-4">
                            <li key={artist.id}>
                                <img className="card-img-top" src={image} width="150px" />
                                <p className="card-title text-center">{artist.name}</p>
                            </li>
                        </div>
                    })
                }
            </ul>
            <h3 classNme='pt-5'>Comments</h3>
            {commentsArtist && <Comments comments={commentsArtist} deleteComment={this.handleDeleteComment} userName={this.props.userName} />}
            <form onSubmit={this.handleFormComment} className="container pt-3 pl-0 pr-0 form-group flex-column row">
                <textarea onChange={this.handleComment} ref="textarea" className="col-12 pt-2" rows="4" name="comment" form="usrform"></textarea>
                <button type="submit" className="btn btn-outline-info mt-2">Comment</button>
            </form>
        </section>
    }
}

export default Albums