import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import api from '../server/api'
import {
    Link
} from 'react-router-dom'
import '../css/Video.css'

// Link da documentação https://www.npmjs.com/package/react-player
class VideoFilms extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            films: {}
        }
    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadFilmsbyId(this.props.match.params.id)
            .then((res) => {
                { this.setState({ films: res.data }) }
            })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })

    }

    validVideo(url) {
        return (ReactPlayer.canPlay(url)) ? true : false
    }

    // altera o status para assistido quando o usuário clicar em Assistir
    changeStatus(film) {
        const myNewFilm = {
            id: film.id,
            name: film.name,
            comment: film.comment,
            status: 'watched',
            genre: film.genre,
            genreOld: film.genreOld,
            img: film.img,
            video: film.video
        }
        api.updateFilms(myNewFilm)
            .then((res) => {
            })
    }

    render() {
        if (!this.validVideo(this.state.films.video)) {
            return (
                <section id="intro" className="intro-section alert alert-info introVideo">
                    <h1 style={{marginBottom:'20px'}}>Não foi possível carregar :(</h1>
                    {this.isLoading &&
                        <p>Carregando, aguarde...</p>
                    }
                    {!this.isLoading &&
                        <div id='noneFilm'><h5>URL do vídeo cadastrado inválida</h5>
                            <p style={{marginTop:'5px'}}>Mas fique tranquilo! Você pode alterar clicando aqui: <Link style={{marginTop:'10px'}} className="btn btn-success" to={'/films-edit' + this.state.films.id}><h4>Editar</h4></Link></p>
                        </div>
                    }
                </section>
            )
        } else {
            return (
                <div>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={this.state.films.video}
                            width='95%'
                            height='95%'
                            controls={true}
                        />

                    </div>

                    <div className='watched'>
                        <span>Já assistiu?</span>
                        <Link className="btn btn-success" to={'/films/favorite'}>
                            <span onClick={() => this.changeStatus(this.state.films)}>Sim</span></Link>
                    </div>
                </div>
            )
        }
    }
}

export default VideoFilms