const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { albumId } } = req

    try {
        logic.listCommentsFromAlbum(albumId)
            .then(comments => res.json(comments))
            .catch(({ message }) => {
                res.status(404).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(404).json({
            error: message
        })
    }
}