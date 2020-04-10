import React, { Component } from 'react'
import api from '../server/api'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import '../css/Films.css'

class NewFilms extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            films: [],
            isLoading: false,
            redirect: false,
            selectedFile: null,
            persons: [],
            name: '',
            urlVideo: '',
            errors: {
                name: false,
                urlVideo: false
            },
            touched: {
                name: false,
                urlVideo: false
            }
        }

        this.saveFilms = this.saveFilms.bind(this)
        this.validURL = this.validURL.bind(this)
        this.validateField = this.validateField.bind(this)
        this.canBeSubmitted = this.canBeSubmitted.bind(this)
        this.handleBur = this.handleBur.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUrlVideoChange = this.handleUrlVideoChange.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this._isMounted = true

        // define que os dados estão sendo carregados
        this.setState({ isLoading: true })

        api.loadGenres()
            .then((res) => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                        genres: res.data
                    })
                }
            })
    }

    validateField(name, urlVideo) {
        return {
            name: !this.validName(name),
            urlVideo: !this.validURL(urlVideo) 
        }
    }

    validName(name) {
        const newName = name.replace(/\s+/g, '')
        if ((newName.length === 0) || (newName === '') || (newName === ' ')) {
            return false
        } else
            return true
    }

    validURL(str) {
        let regex = /(http|https):(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(|([\w#!:.?+=&%!]))?/;
        return (!regex.test(str)) ? false : true;
    }

    saveFilms = event => {
        if (!this.canBeSubmitted()) {
            event.preventDefault()
            return
        }
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
            })

        let valueURLImg = ''
        let nameImage = ''

        if (this.state.selectedFile === null) {
            valueURLImg = null //no pôster
            nameImage = null // no image
        } else {
            nameImage = this.state.selectedFile.name
            valueURLImg = 'http://localhost:3000/images/' + this.state.selectedFile.name
        }

        const newFilms = {
            name: this.refs.name.value.trim(),
            comment: this.refs.comment.value,
            status: 'toWatch',
            genre: this.refs.genre.value,
            img: valueURLImg,
            nameImage: nameImage,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(newFilms.name)
        let isValidVideo = this.validURL(newFilms.video)

        if ((isValidName === true) && (isValidVideo === true)) {

            api.saveFilms(newFilms)
                .then((res) => {
                    this.setState({
                        redirect: '/films/' + newFilms.genre,
                    }
                    )
                })
        } else if (isValidVideo === false) {
            alert("Por favor, entre com uma URL válida");
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    canBeSubmitted() {
        const errors = this.validateField(this.state.name, this.state.urlVideo)
        const isDisabled = !Object.keys(errors).some(x => errors[x])
        return isDisabled
    }

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }

    handleUrlVideoChange = event => {
        this.setState({
            urlVideo: event.target.value
        })
    }

    handleBur = field => event => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    render() {
        const errors = this.validateField(this.state.name, this.state.urlVideo)
        const isDisabled = Object.keys(errors).some(x => errors[x])

        const shouldMarkError = field => {
            const hasError = errors[field]
            const shouldShow = this.state.touched[field]

            return hasError ? shouldShow : false
        }

        return (
            <section className='intro-new-add-edit'>
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                < h1 className="h1AddAddEdit" > Novo filme</h1>
                <form>
                    <div className="intro-group">
                        <p className="text-truncate">Nome *</p>
                        <input
                            placeholder="Entre com o nome do filme... *"
                            ref='name'
                            className={shouldMarkError('name') ? 'error' : 'inputNewEditFilms'}
                            onChange={this.handleNameChange}
                            value={this.state.name}
                            onBlur={this.handleBur('name')}
                        /> <br />
                    </div>
                    <div className="intro-group">
                        <p className="text-truncate">Genêro *</p>
                        <select ref="genre" required>
                            {
                                this.state.genres
                                    .map(key => <option key={key} value={key}>{key}</option>)
                            }
                        </select> <br />
                    </div>
                    <p className="text-truncate">Descrição</p> <textarea ref="comment" placeholder="Adicione uma descrição ;)" /> <br />
                    <p className="text-truncate">Faça upload do pôster</p> <input type="file" name="file" onChange={this.onChangeHandler} /> <br />
                    <div className="intro-group">
                        <p className="text-truncate">URL do vídeo *</p>
                        <input
                            placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo... *"
                            ref='urlVideo'
                            className={shouldMarkError('urlVideo') ? 'error' : 'inputNewEditFilms'}
                            onChange={this.handleUrlVideoChange}
                            value={this.state.urlVideo}
                            onBlur={this.handleBur('urlVideo')}
                        /> <br />
                    </div>
                    <button disabled={isDisabled} type="button" onClick={this.saveFilms} className="btn btn-primary btn-lg">Adicionar</button> <br /> <br />
                </form>
            </section >
        )
    }
}

export default NewFilms