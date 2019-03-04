import React from 'react'
import Feedback from '../Feedback'

import './index.sass'

class Register extends React.Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '' }

    handleNameInput = event => this.setState({ name: event.target.value })

    handleSurnameInput = event => this.setState({ surname: event.target.value })

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswordInput = event => this.setState({ password: event.target.value })

    handlePasswordConfirmInput = event => this.setState({ passwordConfirm: event.target.value })


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirm)

    }

    handleLoginLink = event => {
        event.preventDefault()

        this.props.registerToLogin()
    }

    render() {
        return <section className="welcome">
            <section className="login__margins">
                <div className="login container pl-lg-5 pr-lg-5">
                    <h2 className="text-center mt-3">Register</h2>
                    <form onSubmit={this.handleFormSubmit} className="login__form form-group container" >
                        <div className="row">
                            <label htmlFor="name" className="col col-md-3 col-sm-12 flex mt-1">Name</label>
                            <input onChange={this.handleNameInput} type="text" className="col col-md-9 col-12 form-control mt-1" name="name" placeholder="Name" required />
                            <label htmlFor="surname" className="col col-md-3 col-sm-12 flex mt-1">Surname</label>
                            <input onChange={this.handleSurnameInput} type="text" className="col col-md-9 col-12 fForm-control mt-1" name="surname" placeholder="Surname" required />
                            <label htmlFor="email" className="col col-md-3 col-sm-12 flex mt-1">Email</label>
                            <input onChange={this.handleEmailInput} type="email" className="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Password</label>
                            <input onChange={this.handlePasswordInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required />
                            <label htmlFor="password" className="col col-md-3 col-sm-12 flex mt-1">Confirm Password</label>
                            <input onChange={this.handlePasswordConfirmInput} type="password" className="col col-md-9 col-12 form-control mt-1" name="passwordConfirm" placeholder="Confirm Password" required />
                        </div>
                        <div className="mt-3 ">
                            {this.props.feedback && <Feedback message={this.props.feedback} level={'warn'} className="col col-12" />}
                        </div>
                        <div className="row login-flex mt-3">
                            <button type="submit" className="btn btn-dark col-12 col-sm-8">Register</button>
                            <div className="col-12 col-sm-4 p-0 pl-sm-2">
                                <a onClick={this.handleLoginLink} href="#" className="btn btn-outline-secondary login__register-link mt-2 mt-sm-0 col-12">Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>
    }

}

export default Register