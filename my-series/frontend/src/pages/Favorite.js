import React, { Component } from 'react'

import {
    Link
} from 'react-router-dom'

import api from '../server/api'
import '../css/Home.css'
import '../css/Films.css'

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

let nameImage = ''

class Films extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isFavorite: false,
            films: []
        }

        this.renderFilms = this.renderFilms.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadFilmsbyFavorite()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    films: res.data
                })
            })
    }

    removeFavorites(filmRemove) {
        const myFavoriteFilm = {
            id: filmRemove.id,
            name: filmRemove.name,
            comment: filmRemove.comment,
            status: filmRemove.status,
            genre: filmRemove.genreOld,
            genreOld: filmRemove.genreOld,
            img: filmRemove.img,
            nameImage: filmRemove.nameImage,
            video: filmRemove.video
        }
        api.updateFilms(myFavoriteFilm)
            .then((res) => {
                this.loadData()
            })
    }

    // altera o status para assistindo quando o usuário clicar em Assistir
    changeStatus(film) {
        const myNewFilm = {
            id: film.id,
            name: film.name,
            comment: film.comment,
            status: 'watching',
            genre: film.genre,
            genreOld: film.genreOld,
            nameImage: film.nameImage,
            img: film.img,
            video: film.video
        }
        api.updateFilms(myNewFilm)
            .then((res) => {
            })

    }


    renderFilms(films) {
        return (
            <div key={films.id} className="col-4">
                <div className="thumbnail" style={{ borderRadius: '10px' }}>
                    <img className="group list-group-image" src={films.img} alt="thumbnail de filmes" />
                    <div className="caption">
                        <h2 className="group inner list-group-item-heading text-truncate" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                            {films.name}</h2>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead text-truncate" style={{ textAlign: 'center' }}>
                                    {films.genreOld} / {statuses[films.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-primary buttonFilms" role="group" style={{ marginRight: '25px', marginBottom: '20px'}} to={'/films-video' + films.id}>
                                    <h4 className="btn btn-outline-primary buttonFavorite" style={{ marginRight: '5px' }} onClick={() => this.changeStatus(films)}>Assistir filme</h4> </Link>
                                <Link className="btn btn-danger buttonFavorite" style={{ marginRight: '10px' }} onClick={() => this.removeFavorites(films)}><h4 style={{ marginTop: '5px' }} className='text-truncate'>Remover dos favoritos</h4></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id="intro"><h1 className="titleGenre">Meus favoritos</h1>
                {this.isLoading &&
                    <p>Carregando, aguarde...</p>
                }
                {!this.isLoading && this.state.films.length === 0 &&
                    <div className='alert alert-info' id='noneFilm'><h4>Nenhum filme cadastrado</h4></div>
                }
                <div id="films" className="row">
                    {!this.state.isLoading && this.state.films.map(this.renderFilms)}

                </div>
            </section>
        )
    }


}

export default Films