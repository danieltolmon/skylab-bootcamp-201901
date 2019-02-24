const logic = require('../logic')

module.exports = (req, res) => {
    const { query: { q } } = req
    debugger
    try {
        logic.searchArtists(q)

            // .then(artists => res.json(artists))
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