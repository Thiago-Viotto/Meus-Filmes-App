import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'

const status = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class EditSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {}
        }

        this.saveSeries = this.saveSeries.bind(this)

    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadSeriesbyId(this.props.match.params.id)
            .then((res) => {
                { this.setState({ series: res.data }) }
                this.refs.name.value = this.state.series.name
                this.refs.genre.value = this.state.series.genre
                this.refs.comment.value = this.state.series.comment
                this.refs.status.value = this.state.series.status
                this.refs.urlImage.value = this.state.series.urlImage
            })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    saveSeries() {
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value
        }
        api.updateSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }

    render() {
        return (
            <section className='intro-section'>
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                <h1>Favoritos</h1>
                <form>
                    Nome: <input type="text" ref="name" defaultValue={this.state.series.name} className="form-control" readOnly /> <br />
                    Status:
                        <select ref="status" >
                        {Object.keys(status).map(key => <option key={key} value={key}>{status[key]}</option>)}
                    </select>
                    &nbsp; Genêro:
                    <select ref="genre">
                        {
                            this.state.genres
                                .map(key => <option key={key} value={key}>{key}</option>)
                        }
                    </select> <br /> <br />
                    Comentários: <textarea ref="comment" className="form-control" placeholder="Ex: não esquecer da pipoca! ;)" /> <br />
                    <img src={this.state.series.img} width="400" height="300"></img> <br /> <br /> 
                    URL da imagem: <input type="text" ref="urlImage" className="form-control" defaultValue={this.state.series.img}/> <br />
                    <button type="button" onClick={this.saveSeries}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries