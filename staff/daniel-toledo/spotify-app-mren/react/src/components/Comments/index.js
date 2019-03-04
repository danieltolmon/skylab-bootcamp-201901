import React from 'react'

import './index.sass'

class Comments extends React.Component {

    handleDeleteComment(commentId) {

        this.props.deleteComment(commentId)
    }

    render() {
        const { props: { comments, userName } } = this

        return <section className=" container">
            <ul className="row list-group">
                {
                    comments.map(comment => {
                        return <div key={comment._id} style={{ cursor: 'pointer' }}>
                            <li className="list-group-item p-3" key={comment._id}>
                                <div className="d-flex flex-row-reverse">
                                    <i onClick={() => this.handleDeleteComment(comment._id)} className="fas fa-times"></i>
                                    {/* {user._id===comment.userId? <i onClick={() => this.handleDeleteComment(comment._id)} className="fas fa-times"></i>:<i> </i>} */}
                                </div>
                                <p className="font-weight-bold mb-0">{userName}</p>
                                <p className="font-italic">{comment.date}</p>
                                <p>{comment.text}</p>
                            </li>
                        </div>
                    })
                }
            </ul>
        </section>
    }
}

export default Comments