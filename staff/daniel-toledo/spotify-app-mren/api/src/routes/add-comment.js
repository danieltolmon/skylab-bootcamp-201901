const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { target, targetId }, body: { text }, userId } = req

    try {
        let id = logic.addComment(userId, target, targetId, text)
        res.json({ id })

    } catch ({ message }) {
        res.status(409).json({
            error: message
        })
    }
}