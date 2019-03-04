const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { artistId }, body: { userId }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.toggleFavoriteArtist(userId, token, artistId)
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