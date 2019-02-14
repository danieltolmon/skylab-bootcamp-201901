'use strict'

const { expect } = require('chai')
const userApi = require('.')

describe('user api', () => {
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).to.exist)
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username \"${username}\" already exists`)
                })
        )

        // it('should fail on no string name', () =>{
        //     const nameNum=4
        //     const res= userApi.register(nameNum, surname, username, password)
        //     expect(()=>res).to.throw(TypeError,`${nameNum} is not a string` )
        // })

        // it('should fail on empty name', () =>{
        //     const nameEmpty=''
        //     return userApi.register(nameEmpty, surname, username, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`name is empty`)
        //         })
        // })

        // it('should fail on no string surname', () =>{
        //     const surnameNum=4
        //     return userApi.register(name, surnameNum, username, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`${surnameNum} is not a string`)
        //         })
        // })

        // it('should fail on empty surname', () =>{

        //     const surnameEmpty=''
        //     return userApi.register(name, surnameEmpty, username, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`surname is empty`)
        //         })
           
        // })

        
        // it('should fail on no string username', () =>{
        //     const usernameNum=4
        //     return userApi.register(name, surname, usernameNum, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`${usernameNum} is not a string`)
        //         })
        // })

        // it('should fail on empty username', () =>{
        //     const usernameEmpty=''
        //     return userApi.register(name, surname, usernameEmpty, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`username is empty`)
        //         })
        // })

        // it('should fail on no string password', () =>{
        //     const passwordNum=4
        //     return userApi.register(name, surname, username, passwordNum)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`${passwordNum} is not a string`)
        //         })
        // })

        // it('should fail on empty password', () =>{
        //     const passwordEmpty=''
        //     return userApi.register(name, surname, username, passwordEmpty)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).to.exist
        //             expect(error.message).to.equal(`password is empty`)
        //         })
        // })
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).to.equal(_id)
                    expect(token).to.exist
                })
        )

        // TODO more unit test cases
    })

    describe('retrieve', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                })
        )

        // TODO more unit test cases
    })

    describe('update', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(data.name)
                    expect(user.surname).to.equal(data.surname)
                    expect(user.age).to.equal(data.age)
                    expect(user.username).to.equal(username)
                })
        })

        // TODO more unit test cases
    })

    describe('remove', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).to.equal(`user with id \"${_id}\" does not exist`))
        })

        // TODO more unit test cases
    })
})