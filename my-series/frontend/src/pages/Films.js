import React, { Component } from 'react'
import axios from 'axios'

import {
    Link
} from 'react-router-dom'

import api from '../server/api'
import '../css/Home.css'

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class Films extends Component {
    is_Mounted = false

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            films: [],
            genres: [],
            redirect: false,
            valueBaseDecode: ''
        }

        this.renderFilms = this.renderFilms.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addFavorite = this.addFavorite.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this._isMounted = true
        this.loadData()
    }

    loadData() {
        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadGenresbyGenrew(this.props.match.params.genre)
            .then((res) => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        films: res.data
                    })
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    deleteImage(url, id) {
        return fetch('https://www.localhost:8000/upload/' + id, {
            method: 'delete'
        })
            .then(response => response.json());
    }

    deleteFilms(id, film) {
        const urlImage = film.img
        // this.deleteImage(urlImage, id)
        axios.get('http://www.localhost:8000/upload/')
            .then(res => {
                console.log(res.data);
            })


        /*  let pathSerie = serie.img
          $.ajax({
              type: "DELETE",
              url: pathSerie,
              success: function(response) {
                  console.log("successfully deleted");
              },
              error: function () {
                  console.log("error");
              }
          })   */


        api.deleteFilms(id)
            .then((res) => {
                this.loadData()
            })
    }

    addFavorite(favoriteFilm) {
        const myFavoriteFilm = {
            id: favoriteFilm.id,
            name: favoriteFilm.name,
            comment: favoriteFilm.comment,
            status: favoriteFilm.status,
            genreOld: favoriteFilm.genre,
            genre: 'favorite',
            img: favoriteFilm.img,
            video: favoriteFilm.video
        }
        api.updateFilms(myFavoriteFilm)
            .then((res) => {
                this.loadData()
            })
    }

    renderFilms(films) {
        return (
            <div key={films.id} className="col-4">
                <div className="thumbnail" style={{ borderRadius: '10px' }}>
                    <div className='films filmsGenre'>
                        <img className="group list-group-image filmsGenre" src={films.img} alt="thumbnail de filmes" />
                    </div>
                    <div className="caption">
                        <h2 className="group inner list-group-item-heading text-truncate" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                            {films.name}</h2>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead text-truncate" style={{ fontSize: '16px', textAlign: 'center' }}>
                                    {films.genre} / {statuses[films.status]}</p>
                            </div>
                            <Link className="btn btn-primary buttonFilms" role="group" style={{ marginRight: '5px' }} onClick={() => this.addFavorite(films)} ><h4 className='text-truncate'>Favoritos</h4></Link>
                            <Link className="btn btn-outline-primary buttonFilms" style={{ marginRight: '5px' }} to={'/films-edit' + films.id} ><h4 className='text-truncate'>Editar</h4></Link>
                            <Link className="btn btn-danger buttonFilms" style={{ marginRight: '10px' }} onClick={() => this.deleteFilms(films.id, films)}><h4 className='text-truncate'>Excluir</h4></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        console.log(this.state.films)
        if (this.props.match.params.genre !== 'favorite') {
            return (
                <section id="intro" >
                    <h1 className='titleGenre'>Filmes de {this.props.match.params.genre}</h1>
                    {this.isLoading &&
                        <p>Carregando, aguarde...</p>
                    }
                    {!this.isLoading && this.state.films.length === 0 &&
                        <div className='alert alert-info' id='noneFilm'>
                            <h3>Nenhum filme cadastrado</h3>
                            <br />
                            <h5>Clique <Link to={'/new'}>aqui</Link> para cadastrar um filme novo</h5>
                        </div>
                    }
                    <div id="films" className="row">
                        {!this.state.isLoading && this.state.films.map(this.renderFilms)}

                    </div>
                </section>
            )
        } else {
            return null
        }
    }


}

export default Films