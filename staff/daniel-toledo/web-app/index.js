const express = require('express')
const bodyParser = require('body-parser')
const logic = require('./src/logic')
const expressSession=require('express-session')

const { argv: [, , port = 8080] } = process

const app = express()

const formBodyParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))

pullFeedback = req => {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}

render = content => {
    return `<html>
    <head>
        <title>HELLO WORLD</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>HELLO WORLD</h1>
        ${content}
    </body>
    </html>`

}

app.get('/register', (req, res) => {
    res.send(render(`<section class="register">
<h2>Register</h2>
<form method="POST" action="/register">
    <input name="name" type="text" placeholder="name" required>
    <input name="surname" type="text" placeholder="surname" required>
    <input name="email" type="email" placeholder="email" required>
    <input name="password" type="password" placeholder="password" required>
    <input name="passwordConfirm" type="password" placeholder="confirm password" required>
    <button type="submit">Register</button>
</form>
${feedback ? `<section class="feedback feedback--warn">
    ${feedback}
</section>` : ''}
</section>`))
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.send(render(`<section class="register">
            <h2>Registration confirmation</h2>
            Ok, user <strong>${email}</strong> successfully registered, please proceed to <a href="/login">login</a>.
        </section>`)
                ))
            .catch(({ message }) => {
                feedback = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        feedback = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    res.send(render(` <section class="login">
<h2>login</h2>
<form method="POST" action="/login">
    <input name="email" type="email" placeholder="email" required>
    <input name="password" type="password" placeholder="password" required>
    <button type="submit">login</button>
</form>
${feedback ? `<section class="feedback feedback--warn">
    ${feedback}
</section>` : ''}
</section>`))
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.logInUser(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                feedback = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        feedback = message

        res.redirect('/login')
    }
})

// middleware
isLoggedIn = (req, res, next) => {
    if (logic.isUserLoggedIn) next()
    else res.redirect('/login')
}

app.get('/home', isLoggedIn, (req, res) => {
    logic.retrieveUser()
        .then(user => {
            let name = user.name
            res.send(render(` <section class="register">
    <h2>HOME OF ${name}</h2>
</section>`))
        })
})


app.listen(port, () => console.log(`server running on port ${port}`))