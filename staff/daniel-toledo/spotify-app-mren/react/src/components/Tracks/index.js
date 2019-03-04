import React from 'react'
import Comments from '../Comments'

import './index.sass'

class Tracks extends React.Component {
    state = { text: '' }
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
        const { props: { tracks, commentsAlbum, image, getTrackId } } = this

        return <section className="results container">
            <div className="row pt-5 d-flex flex-row align-items-start">
                <img src={image} alt='album' className="col-12 col-md-6 results__image" width="40%" />
                <ul className="col-md-6 pl-5 list-group list-group-flush">
                    {
                        tracks.map(track => {
                            return <li key={track.id} onClick={() => getTrackId(track.id)} data-id={track.id} style={{ cursor: 'pointer' }} className="mb-1 list-group-item button-list">{track.name}</li>
                        })
                    }
                </ul>
            </div>
            <h2>Comments</h2>
            {commentsAlbum && <Comments comments={commentsAlbum} deleteComment={this.handleDeleteComment} userName={this.props.userName} />}
            <form onSubmit={this.handleFormComment} className="container pr-0  pl-0 form-group flex-column pt-5 row">
                <textarea onChange={this.handleComment} ref="textarea" className="col-12 pt-2" rows="4" name="comment" form="usrform"></textarea>
                <button type="submit" className="btn btn-outline-info mt-2">Comment</button>
            </form>
        </section>
    }
}

export default Tracks