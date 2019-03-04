import React from 'react'
import Search from '../Search'

import './index.sass'

class Home extends React.Component {


    handleSearch = query => this.props.onSearch(query)

    render() {
        const {props: {userName}} = this
        return <section className="welcome">
            <div className="welcome__banner">
                <h2 className="text-center pt-5 display-2"> Welcome, <span> {userName} </span>!</h2>
                <p className="text-center mt-2 display-5">Search for an Artist to listen its music. </p>
                <div className="col-4 offset-4 pt-3">
                    <Search onSearch={this.handleSearch} feedback={this.props.searchFeedback} />
                </div>
            </div>

        </section>
    }
}

export default Home