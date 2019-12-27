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

class Series extends Component {
    is_Mounted = false

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            series: [],
            genres: [],
            redirect: false,
            valueBaseDecode: ''
        }

        this.renderSeries = this.renderSeries.bind(this)
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
                        series: res.data
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

    deleteSeries(id, serie) {
        const urlImage = serie.img
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


        api.deleteSeries(id)
            .then((res) => {
                this.loadData()
            })
    }

    addFavorite(favoriteSerie) {
        const myFavoriteSerie = {
            id: favoriteSerie.id,
            name: favoriteSerie.name,
            comment: favoriteSerie.comment,
            status: favoriteSerie.status,
            genreOld: favoriteSerie.genre,
            genre: 'favorite',
            img: favoriteSerie.img,
            video: favoriteSerie.video
        }
        api.updateSeries(myFavoriteSerie)
            .then((res) => {
                this.loadData()
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
                                <p className="lead text-truncate" style={{ fontSize: '16px', textAlign: 'center' }}>
                                    {series.genre} / {statuses[series.status]}</p>
                            </div>
                            <Link className="btn btn-primary buttonSeries" role="group" style={{ marginRight: '5px' }} onClick={() => this.addFavorite(series)} ><h4 className='text-truncate'>Favoritos</h4></Link>
                            <Link className="btn btn-outline-primary buttonSeries" style={{ marginRight: '5px' }} to={'/series-edit' + series.id} ><h4 className='text-truncate'>Editar</h4></Link>
                            <Link className="btn btn-danger buttonSeries" style={{ marginRight: '10px' }} onClick={() => this.deleteSeries(series.id, series)}><h4 className='text-truncate'>Excluir</h4></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.match.params.genre !== 'favorite') {
            return (
                <section id="intro" >
                    <h1 className='titleGenre'>Filmes de {this.props.match.params.genre}</h1>
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
        } else {
            return null
        }
    }


}

export default Series