const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { target, targetId } } = req

    try {
        logic.listComments( target, targetId)
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