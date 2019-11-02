import React, { Component } from 'react'
import api from './api'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from 'react-router-dom'

const status = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class EditSeries extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {}
        }

        this.saveSeries = this.saveSeries.bind(this)
        this.notify = this.notify.bind(this)

    }

    // O Componente está montado
    componentDidMount() {
        this._isMounted = true

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
        const editSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.state.series.status,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(editSeries.name)
        let isValidVideo = this.validURL(editSeries.video)
        isValidVideo = this.validURL(editSeries.img)

        if ((isValidVideo == true) && (isValidName === true)) {
            api.updateSeries(editSeries)
                .then((res) => {
                    if (this._isMounted) {
                        this.notify(editSeries)
                        setTimeout(() => {
                            this.props.history.push('/series/' + editSeries.genre);
                        }, 2000);
                    }
                })
        } else if (isValidVideo === false) {
            alert("Por favor, entre com uma URL válida");
        } else if (isValidName === false)
            alert("Por favor, entre com um nome válido");
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    notify(editSeries) {
        toast.success('O filme ' + '"' + editSeries.name + '"' + ' foi editado com sucesso', { autoClose: 1500 });
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
                    <ToastContainer />
                    <button type="button" onClick={this.saveSeries} className="btnSaveSeries">Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries