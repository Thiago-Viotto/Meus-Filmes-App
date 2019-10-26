import React, { Component } from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'
import { Base64 } from 'js-base64'
import axios from 'axios'

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
            redirect: false,
            selectedFile: null,
            persons: []
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
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.statusText)
            })

        let valueURLImg = 'http://localhost:3000/images/' + this.state.selectedFile.name

        console.log(valueURLImg)

        const newSeries = {
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            img: valueURLImg,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(newSeries.name)
        let isValidVideo = this.validURL(newSeries.video)

        if ((isValidVideo === true) && (isValidName === true)) {
            api.saveSeries(newSeries)
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

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
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
                        <select ref="status" required>
                            {Object.keys(status).map(key => <option key={key} value={key}>{status[key]}</option>)}
                        </select>
                        &nbsp; Genêro:
                    <select ref="genre" required>
                            {
                                this.state.genres
                                    .map(key => <option key={key} value={key}>{key}</option>)
                            }
                        </select> <br /> <br />
                    </div>
                    Comentários <textarea ref="comment" className="form-control" placeholder="Ex: não esquecer da pipoca! ;)" /> <br />
                    Faça upload do pôster <input type="file" name="file" onChange={this.onChangeHandler} /> <br />
                    URL do vídeo <input type="text" ref="urlVideo" className="form-control" placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo" /> <br />
                    <button type="button" onClick={this.saveSeries} className="btnSaveSeries">Salvar</button> <br /> <br />
                </form>
            </section>
        )
    }
}

export default NewSeries