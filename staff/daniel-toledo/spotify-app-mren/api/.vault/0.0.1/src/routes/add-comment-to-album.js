const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { albumId }, body: { userId, text }, headers: { authorization } } = req
    debugger
    const token = authorization.substring(7)

    try {
        logic.addCommentToAlbum(userId, token, albumId, text)
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