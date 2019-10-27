import React, { Component } from 'react'
import api from './api'
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
                if (this.state.series.genre == 'favorite') {
                    this.refs.genre.value = this.state.series.genreOld
                } else {
                    this.refs.genre.value = this.state.series.genre
                }
                this.refs.comment.value = this.state.series.comment
            })

        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data
                })
            })
    }

    validURL(str) {
        let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return (!regex.test(str)) ? false : true;
    }

    validName(name) {
        if ((name === '') || (name === ' ')) {
            return false
        } else {
            return true
        }
    }

    saveSeries() {
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.state.series.status,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(newSeries.name)
        let isValidVideo = this.validURL(newSeries.video)
        isValidVideo = this.validURL(newSeries.img)

        if ((isValidVideo == true) && (isValidName === true)) {
            api.updateSeries(newSeries)
                .then((res) => {
                    this.setState({
                        redirect: '/series/' + this.refs.genre.value
                    })
                })
        } else if (isValidVideo === false) {
            alert("Por favor, entre com uma URL válida");
        } else if (isValidName === false)
            alert("Por favor, entre com um nome válido");
    }

    render() {
        return (
            <section className='intro-new-edit'>
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                <h1 className="h1AddEdit">Editar série</h1>
                <form>
                    <div className="intro-group">
                        Nome <input type="text" ref="name" defaultValue={this.state.series.name} className="form-control" readOnly /> <br />
                    </div>
                    Gênero <input type="text" ref="genre" defaultValue={this.state.series.genre} className="form-control" readOnly /> <br />
                    Comentários <textarea ref="comment" className="form-control" placeholder="Ex: não esquecer da pipoca! ;)" /> <br />
                    <div className="statusGenres">
                        <img src={this.state.series.img} width="400" height="300"></img> <br /> <br /> 
                    </div>
                    URL do pôster <input type="text" ref="urlImage" className="form-control" defaultValue={this.state.series.img} placeholder="Adicione o link da URL da imagem" /> <br />
                    URL do video <input type="text" ref="urlVideo" className="form-control" defaultValue={this.state.series.video} placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo"/> <br />
                    <button type="button" onClick={this.saveSeries} className="btnSaveSeries">Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries