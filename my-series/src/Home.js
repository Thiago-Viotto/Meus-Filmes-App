import React, { Component } from 'react'
import api from './Api'

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import "./css/Home.css"


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false
        }
    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    // Retorna o link do gênero
    renderGenrerLink(genre) {
        return (
            <span key={genre}>&nbsp;<Link to={`/series/${genre}`}>{genre}</Link></span>
        )
    }

    render() {
        return (
            <div>
                <section id="cape" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1><img src="images/logo.png" /></h1>
                                <h4 className="titlesMenu">Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</h4>
                            </div>
                        </div>
                </div>
                </section>

                <section>
                    {this.state.isLoading &&
                        <span>Aguarde, carregando...</span>
                    }
                    {!this.state.isLoading &&
                        <div>
                            <br/>
                            Ver séries do gênero:
                {this.state.genres.map(this.renderGenrerLink)}
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Home