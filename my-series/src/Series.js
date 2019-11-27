import React, { Component } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

import {
    Link
} from 'react-router-dom'

import api from './api'

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
            series: [],
            genres: [],
            redirect: false,
            valueBaseDecode: ''
        }

        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
        this.addFavorite = this.addFavorite.bind(this)
        this.notify = this.notify.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadGenresbyGenrew(this.props.match.params.genre)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data
                })
            })

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
                toast.error('O filme ' + '"' + serie.name + '"' + ' foi removido com sucesso', { autoClose: 1500 });
                setTimeout(() => {
                    this.loadData()
                }, 1500);
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
                this.notify(myFavoriteSerie)
                setTimeout(() => {
                    this.loadData()
                }, 2000);
            })
    }

    notify(myFavoriteSerie) {
        toast('O filme ' + '"' + myFavoriteSerie.name + '"' + ' foi adicionado em Meus favoritos', { autoClose: 1500 });
    }

    renderSeries(series) {
        return (
            <div key={series.id} className="item col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img className="group list-group-image" src={series.img} alt="thumbnail of series" />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            {series.name}</h4>
                        <div className="row">
                            <div className="col-xs-12 col-md-6">
                                <p className="lead">
                                    {series.genre} / {statuses[series.status]}</p>
                            </div>
                            <div className="col-xs-12 col-md-6">
                                <ToastContainer />
                                <Link className="btn btn-primary" onClick={() => this.addFavorite(series)} >Favoritos </Link>
                                <Link className="btn btn-success" to={'/series-edit' + series.id} >Editar </Link>
                                <a className="btn btn-danger" onClick={() => this.deleteSeries(series.id, series)}>Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.match.params.genre !== 'favorite') {
            return (
                <section id="intro" className="intro-section">
                    <h1>Series {this.props.match.params.genre}</h1>
                    {this.isLoading &&
                        <p>Carregando, aguarde...</p>
                    }
                    {!this.isLoading && this.state.series.length === 0 &&
                        <div className='alert alert-info'>Nenhuma série cadastrada.</div>
                    }
                    <div id="series" className="row list-group">
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