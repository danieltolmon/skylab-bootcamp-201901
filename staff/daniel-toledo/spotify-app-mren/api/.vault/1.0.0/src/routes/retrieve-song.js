const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { songId }} = req

    try {
        logic.retrieveSong(songId)
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}