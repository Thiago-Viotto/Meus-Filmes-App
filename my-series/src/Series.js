import React, { Component } from 'react'

import {
    Link
  } from 'react-router-dom'

import api from './Api'

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

        api.loadGenresbyGenrew(this.props.match.params.genre)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data
                })
            })
    }

    deleteSeries(id) {
        api.deleteSeries(id)
            .then((res) => {
                this.loadData()
            })
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
                                <Link className="btn btn-success" to={'/series-edit'+series.id} >Editar </Link> &nbsp;
                                <a className="btn btn-success" onClick={() => this.deleteSeries(series.id)}>Excluir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id="intro" className="intro-section"><h1>Series {this.props.match.params.genre}</h1>
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
    }


}

export default Series