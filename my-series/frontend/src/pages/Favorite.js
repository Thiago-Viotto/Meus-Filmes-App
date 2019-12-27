import React, { Component } from 'react'

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

class Series extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            isFavorite: false,
            series: []
        }

        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadSeriesbyFavorite()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data
                })
            })
    }

    removeFavorites(serieRemove) {
        const myFavoriteSerie = {
            id: serieRemove.id,
            name: serieRemove.name,
            comment: serieRemove.comment,
            status: serieRemove.status,
            genre: serieRemove.genreOld,
            img: serieRemove.img,
            video: serieRemove.video
        }
        api.updateSeries(myFavoriteSerie)
            .then((res) => {
                this.loadData()
            })
    }

    // altera o status para assistindo quando o usuário clicar em Assistir
    changeStatus(serie) {
        const myNewSerie = {
            id: serie.id,
            name: serie.name,
            comment: serie.comment,
            status: 'watching',
            genre: serie.genre,
            genreOld: serie.genreOld,
            img: serie.img,
            video: serie.video
        }
        api.updateSeries(myNewSerie)
            .then((res) => {
            })

    }


    renderSeries(series) {
        return (
            <div key={series.id} className="col-4">
                <div className="thumbnail" style={{ borderRadius: '10px' }}>
                    <img className="group list-group-image" src={series.img} alt="thumbnail of series" />
                    <div className="caption">
                        <h2 className="group inner list-group-item-heading text-truncate" style={{ marginBottom: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                            {series.name}</h2>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead text-truncate" style={{ textAlign: 'center' }}>
                                    {series.genreOld} / {statuses[series.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <Link className="btn btn-primary buttonSeries" role="group" style={{ marginRight: '5px' }} to={'/series-video' + series.id}>
                                    <h4 className="btn btn-outline-primary buttonFavorite" style={{ marginRight: '5px' }} onClick={() => this.changeStatus(series)}>Assistir série</h4> </Link>
                                <Link className="btn btn-danger buttonFavorite" style={{ marginRight: '10px' }} onClick={() => this.removeFavorites(series)}><h4 className='text-truncate'>Remover dos favoritos</h4></Link>
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
                {!this.isLoading && this.state.series.length === 0 &&
                    <div className='alert alert-info'>Nenhuma série cadastrada.</div>
                }
                <div id="series" className="row">
                    {!this.state.isLoading && this.state.series.map(this.renderSeries)}

                </div>
            </section>
        )
    }


}

export default Series