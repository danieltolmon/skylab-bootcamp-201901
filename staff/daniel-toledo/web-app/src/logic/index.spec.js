'use strict'
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
    describe('register user', () => {
        
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).not.to.exist)
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'name cannot be empty')
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'surname cannot be empty')
        })

        it('should fail on undefined email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = undefined
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on numeric email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 10
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')
        })


        it('should fail on boolean email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = false
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on object email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = {}
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on array email', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = []
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on empty email', () => {
            const name = 'Manuel'
            const surname = 'barzi'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'email cannot be empty')
        })

        it('should fail on undefined password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on numeric password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = 123

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')
        })


        it('should fail on boolean password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on object password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on array password', () => {
            const name = 'Manuel'
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on empty password', () => {
            const name = 'Manuel'
            const surname = 'barzi'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'password cannot be empty')
        })
    })

    describe('log in user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email 
        const password = '123'
        const passwordConfirm = password

        beforeEach(() => {
            email = `manuelbarzi@mail.com-${Math.random()}`
            logic.registerUser(name, surname, email, password, passwordConfirm)
        })

        false && it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => {
                    expect(logic.__userId__).to.exist
                    expect(logic.__userApiToken__).to.exist
                })
        )

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on numeric email', () => {
            const email = 10

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')
        })


        it('should fail on boolean email', () => {
            const email = false

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on object email', () => {
            const email = {}

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(Error, 'email cannot be empty')
        })

        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on numeric password', () => {
            const password = 123

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')
        })


        it('should fail on boolean password', () => {
            const password = true

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on object password', () => {
            const password = {}

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on array password', () => {
            const password = []

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(Error, 'password cannot be empty')
        })
    })

    describe('check user is logged in', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).to.be.true)
        )
    })

    describe('log out user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__userId__).to.be.null
            expect(logic.__userId__).to.be.null
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).to.equal(logic.__userId__)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })
        )
    })

    // TODO updateUser and removeUser
})