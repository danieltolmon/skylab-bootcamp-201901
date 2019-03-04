const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { commentId }, userId  } = req

    try {
        logic.deleteComment(userId, commentId)
            .then(id => res.json({ id }))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}