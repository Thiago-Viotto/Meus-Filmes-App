import React, { Component } from 'react'
import api from './server/api'

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
        // <h2 key={genre}>&nbsp;&nbsp;<Link to={`/series/${genre}`}>{genre}</Link></h2>
        //  <Link to={`/series/${genre}`}><span key={genre}>&nbsp;&nbsp;{genre}</span></Link>
        switch (genre) {
            case "Comédia": 
                return <Link key={genre} to={`/series/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="series">
                        <img border="0" alt={genre} src="imgGenres/comedia.jpg" width="400" height="300" />
                    </div>
                </div>
                        </Link>;
  
            case "Drama": 
                return <Link key={genre} to={`/series/${genre}`}>
                <div className="item col-xs-4 col-lg-4">
                    <div className="series">
                        <img border="0" alt={genre} src="imgGenres/drama.jpg" width="400" height="300" />
                    </div>
                </div>
                        </Link>;
            case "Ação": 
                return <Link key={genre} to={`/series/${genre}`}>
                    <div className="item col-xs-4 col-lg-4">
                        <div className="series">
                            <img border="0" alt={genre} src="imgGenres/acao.jpg" width="400" height="300" />
                        </div>
                    </div>
                        </Link>;
            default: 
                return <Link key={genre} to={`/series/${genre}`}>
                    <div className="item col-xs-4 col-lg-4">
                        <div className="thumbnail">
                            <img border="0" alt={genre} src="imgGenres/padrao.jpg" width="400" height="300" />
                        </div>
                    </div>
                        </Link>;
        }
    }

    render() {
        return (
            <div>
                <section id="cape" className="intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <img className="group list-group-image" src="images/logo.png" alt='Imagem do logo' style={{width:'100%', maxWidth:'480px'}} />
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
                            <br /> 
                            {this.state.genres.map(this.renderGenrerLink)}
                        </div>
                    }
                </section>
            </div>
        )
    }
}

export default Home