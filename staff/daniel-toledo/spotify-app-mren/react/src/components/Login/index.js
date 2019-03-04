import React from 'react'
import Feedback from '../Feedback'

import './index.sass'

class Login extends React.Component {
    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    handleRegisterLink = event => {
        event.preventDefault()

        this.props.loginToRegister()
    }

    render() {
        return <section className="welcome">
            <section className="login__margins">
                <div className="login container pl-lg-5 pr-lg-5">
                    <h2 className="text-center mt-3">Login</h2>
                    <form onSubmit={this.handleFormSubmit} className="login__form form-group container mb-3 " >
                        <div className="row">
                            <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                            <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                        </div>
                        <div className="mt-3 ">
                            {this.props.feedback && <Feedback message={this.props.feedback} level={'warn'} className="col col-12" />}
                        </div>
                        <div className="row login-flex mt-3">
                            <button type="submit" className="btn btn-dark col-12 col-sm-8">Login</button>
                            <div className="col-12 col-sm-4 p-0 pl-sm-2">
                                <button onClick={this.handleRegisterLink} href="#" className="btn btn-outline-secondary login__register-link mt-2 mt-sm-0 col-12">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    }
}

export default Login