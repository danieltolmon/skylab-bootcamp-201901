'use strict'

const expect = require('expect')
const path = require('path')
const fsp = require('fs').promises
const albumComment = require('.')
const uuid = require('uuid')

describe('album comments data', () => {
    albumComment.file='album-comments-test.json'
    const file = path.join(__dirname, albumComment.file)

    beforeEach(() => fsp.writeFile(file, JSON.stringify([])))

    describe('__load__', () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            }
        ]

        beforeEach(() => fsp.writeFile(file, JSON.stringify(comments)))

        it('should succeed on correct file path', () =>
            albumComment.__load__(file)
                .then(_comments => {
                    expect(_comments).toBeDefined()
                    expect(_comments.length).toBe(comments.length)

                    _comments.forEach(({ id, userId, albumId, text, date }, index) => {
                        expect(id).toBe(comments[index].id)
                        expect(userId).toBe(comments[index].userId)
                        expect(albumId).toBe(comments[index].albumId)
                        expect(text).toBe(comments[index].text)
                        expect(date).toBe(comments[index].date.toISOString())
                    })
                })
        )
    })

    describe('__save__', () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                albumId: `albumId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date
            }
        ]

        it('should succeed on correct file path', () =>
            albumComment.__save__(file, comments)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(_comments => {
                    expect(_comments).toBeDefined()
                    expect(_comments.length).toBe(comments.length)

                    _comments.forEach(({ id, userId, albumId, text, date }, index) => {
                        expect(id).toBe(comments[index].id)
                        expect(userId).toBe(comments[index].userId)
                        expect(albumId).toBe(comments[index].albumId)
                        expect(text).toBe(comments[index].text)
                        expect(date).toBe(comments[index].date.toISOString())
                    })
                })
        )
    })

    describe('add', () => {
        const comment = {
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        it('should succeed on correct data', () =>
            albumComment.add(comment)
                .then(() => {
                    expect(comment.id).toBeDefined()

                    return fsp.readFile(file)
                })
                .then(content => JSON.parse(content))
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, userId, albumId, text, date }] = comments

                    expect(id).toBe(comment.id)
                    expect(userId).toBe(comment.userId)
                    expect(albumId).toBe(comment.albumId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        )

        it('should fail in undefined comment', () =>
            expect(() => albumComment.add()).toThrow(Error, 'comment should be defined')
        )

        it('should fail in comment different than Object', () =>
            expect(() => albumComment.add(4)).toThrow(TypeError, `4 should be an Obect`)
        )
    })

    describe('retrieve', () => {
        const comment = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // albumComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct commend id', () =>
            albumComment.retrieve(comment.id)
                .then(({ id, albumId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(albumId).toBe(comment.albumId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date.toString()).toBe(comment.date.toString())
                })
        )

        it('should fail in undefined id', () =>
            expect(() => albumComment.retrieve()).toThrow(Error, 'comment should be defined')
        )

        it('should fail in id different than string', () =>
            expect(() => albumComment.retrieve(4)).toThrow(TypeError, `4 should be a string`)
        )
    })

    describe('update', () => {
        const comment = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // albumComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct data', () => {
            comment.text += '-NEW'

            return albumComment.update(comment)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(comments => comments.find(_comment => _comment.id === comment.id))
                .then(({ id, albumId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(albumId).toBe(comment.albumId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        })

        it('should fail in undefined comment', () =>
            expect(() => albumComment.update()).toThrow(Error, 'comment should be defined')
        )

        it('should fail in comment different than Object', () =>
            expect(() => albumComment.update(4)).toThrow(TypeError, `4 should be an Obect`)
        )
    })

    describe('remove', () => {
        const comment = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // albumComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )

        it('should succeed on correct comment id', () =>
            albumComment.remove(comment.id)
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(comments => comments.find(_comment => _comment.id === comment.id))
                .then(comment => expect(comment).toBeUndefined())
        )

        it('should fail in undefined id', () =>
            expect(() => albumComment.remove()).toThrow(Error, 'id should be defined')
        )

        it('should fail in id different than string', () =>
            expect(() => albumComment.remove(4)).toThrow(TypeError, `4 should be a string`)
        )
    })

    describe('removeAll', () => {
        const comment = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            // albumComment.add(comment) // FATAL each test should test ONE unit
            fsp.writeFile(file, JSON.stringify([comment]))
        )
        it('should remove all data', () =>
            albumComment.removeAll()
                .then(() => fsp.readFile(file))
                .then(content => JSON.parse(content))
                .then(content => {
                    expect(content).toBeDefined()
                    expect(content.length).toBe(0)
                    expect(content.constructor).toBe(Array)
                })

        )
    })

    describe('find', () => {
        const comment = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment2 = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment3 = {
            id: uuid(),
            albumId: `albumId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment4 = {
            id: uuid(),
            albumId: comment2.albumId,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment5 = {
            id: uuid(),
            albumId: comment2.albumId,
            userId: `userId-5-${Math.random()}`,
            text: comment4.text,
            date: new Date
        }

        beforeEach(() =>
            // albumComment.add(comment) // FATAL each test should test ONE unit
            //     .then(() => albumComment.add(comment2))
            //     .then(() => albumComment.add(comment3))
            //     .then(() => albumComment.add(comment4))
            //     .then(() => albumComment.add(comment5))
            fsp.writeFile(file, JSON.stringify([comment, comment2, comment3, comment4, comment5]))
        )

        it('should succeed on correct criteria by id', () =>
            albumComment.find({ id: comment2.id })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, albumId, userId, text, date }] = comments

                    expect(id).toBe(comment2.id)
                    expect(albumId).toBe(comment2.albumId)
                    expect(userId).toBe(comment2.userId)
                    expect(text).toBe(comment2.text)
                    expect(date).toEqual(comment2.date)
                })
        )

        it('should succeed on correct criteria by album id', () =>
            albumComment.find({ albumId: comment2.albumId })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(3)

                    const [_comment, _comment2, _comment3] = comments

                    expect(_comment.id).toBe(comment2.id)
                    expect(_comment.albumId).toBe(comment2.albumId)
                    expect(_comment.userId).toBe(comment2.userId)
                    expect(_comment.text).toBe(comment2.text)
                    expect(_comment.date).toEqual(comment2.date)

                    expect(_comment2.id).toBe(comment4.id)
                    expect(_comment2.albumId).toBe(comment4.albumId)
                    expect(_comment2.userId).toBe(comment4.userId)
                    expect(_comment2.text).toBe(comment4.text)
                    expect(_comment2.date).toEqual(comment4.date)

                    expect(_comment3.id).toBe(comment5.id)
                    expect(_comment3.albumId).toBe(comment5.albumId)
                    expect(_comment3.userId).toBe(comment5.userId)
                    expect(_comment3.text).toBe(comment5.text)
                    expect(_comment3.date).toEqual(comment5.date)
                })
        )

        it('should succeed on correct criteria by album id and comment', () =>
            albumComment.find({ albumId: comment2.albumId, text: comment4.text })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(2)

                    const [_comment, _comment2] = comments

                    expect(_comment.id).toBe(comment4.id)
                    expect(_comment.albumId).toBe(comment4.albumId)
                    expect(_comment.userId).toBe(comment4.userId)
                    expect(_comment.text).toBe(comment4.text)
                    expect(_comment.date).toEqual(comment4.date)

                    expect(_comment2.id).toBe(comment5.id)
                    expect(_comment2.albumId).toBe(comment5.albumId)
                    expect(_comment2.userId).toBe(comment5.userId)
                    expect(_comment2.text).toBe(comment5.text)
                    expect(_comment2.date).toEqual(comment5.date)
                })
        )

        
        it('should fail in undefined criteria', () =>
            expect(() => albumComment.add()).toThrow(Error, 'criteria should be defined')
        )

        it('should fail in criteria different than Object', () =>
            expect(() => albumComment.add(4)).toThrow(TypeError, `4 should be an Obect`)
        )
    })

    after(() => fsp.writeFile(file, JSON.stringify([])))
})