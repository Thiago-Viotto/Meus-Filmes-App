import React, { Component } from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'

const status = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class NewSeries extends Component {
    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            series: [],
            isLoading: false,
            redirect: false
        }

        this.saveSeries = this.saveSeries.bind(this)
    }

    // O Componente está montado
    componentDidMount() {

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

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
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value,
            video: this.refs.urlVideo.value
        }

        api.saveSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })
    }


    render() {
        return (
            <section className='intro-new-edit'>
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                <h1 className="h1AddEdit">Nova série</h1>
                <form>
                    <div className="intro-group">
                    Nome <input type="text" ref="name" className="form-control" /> <br />
                    </div>
                    <div className="statusGenres">
                    Status:
                        <select ref="status">
                        {Object.keys(status).map(key => <option key={key} value={key}>{status[key]}</option>)}
                    </select> 
                    &nbsp; Genêro:
                    <select ref="genre">
                        {
                            this.state.genres
                                .map(key => <option key={key} value={key}>{key}</option>)
                        }
                    </select> <br /> <br />
                    </div>
                    Comentários <textarea ref="comment" className="form-control" placeholder="Ex: não esquecer da pipoca! ;)"/> <br />
                    URL do pôster <input type="text" ref="urlImage" className="form-control" placeholder="Adicione o link da URL da imagem" /> <br />
                    URL do vídeo <input type="text" ref="urlVideo" className="form-control" placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo" /> <br />
                    <button type="button" onClick={this.saveSeries} className="btnSaveSeries">Salvar</button> <br /> <br />
                </form>
            </section>
        )
    }
}

export default NewSeries