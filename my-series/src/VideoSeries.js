import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import api from './api'
import {
    Link
} from 'react-router-dom'
import './css/Video.css'

// Link da documentação https://www.npmjs.com/package/react-player
class VideoSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            series: {}
        }
    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadSeriesbyId(this.props.match.params.id)
            .then((res) => {
                { this.setState({ series: res.data }) }
            })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    render() {
        console.log(this.state.series.video)
        if (!this.state.series.video) {
            return (
                <section id="intro" className="intro-section">
                    <h1>Não foi possível carregar :(</h1>
                    {this.isLoading &&
                        <p>Carregando, aguarde...</p>
                    }
                    {!this.isLoading &&
                        <div className='alert alert-info'>URL do vídeo cadastrado inválida.
                            <p>Mas fique tranquilo! Você pode alterar clicando aqui: <Link className="btn btn-success" to={'/series-edit' + this.state.series.id} >Editar </Link></p>
                        </div>
                    }
                </section>
            )
        } else {
            return (
                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={this.state.series.video}
                        width='100%'
                        height='100%'
                        controls={true}
                    />
                </div>
            )
        }

    }
}

export default VideoSeries