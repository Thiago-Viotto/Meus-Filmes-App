import React, { Component } from 'react'
import api from '../server/api'
import { Redirect } from 'react-router-dom'
import { FormControl } from 'react-bootstrap'

const status = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

let nameUpdate = ''
let urlVideoUpdate = ''

class EditSeries extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {},
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

        this.saveSeries = this.saveSeries.bind(this)
        this.validURL = this.validURL.bind(this)
        this.validateField = this.validateField.bind(this)
        this.canBeSubmitted = this.canBeSubmitted.bind(this)
        this.handleBur = this.handleBur.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleUrlVideoChange = this.handleUrlVideoChange.bind(this)
    }

    // O Componente está montado
    componentDidMount() {
        this._isMounted = true

        api.loadSeriesbyId(this.props.match.params.id)
            .then((res) => {
                if (this._isMounted) {
                    // define que os dados estão sendo carregados
                    this.setState({ isLoading: true })
                }
                { this.setState({ series: res.data }) }
                this.refs.name.value = this.state.series.name
                nameUpdate = this.state.series.name // name initial that will be updated
                urlVideoUpdate = this.state.series.video // urlVideo initial that will be updated
                if (this.state.series.genre == 'favorite') {
                    this.refs.genre.value = this.state.series.genreOld
                } else {
                    this.refs.genre.value = this.state.series.genre
                }
                this.refs.comment.value = this.state.series.comment
            })

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
        let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return (!regex.test(str)) ? false : true;
    }

    saveSeries = event => {
        if (!this.canBeSubmitted()) {
            event.preventDefault()
            return
        }
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        const editSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value.trim(),
            comment: this.refs.comment.value,
            status: this.state.series.status,
            genre: this.refs.genre.value,
            img: this.refs.urlImage.value,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(editSeries.name)
        let isValidVideo = this.validURL(editSeries.video)

        if ((isValidName === true) && (isValidVideo === true)) {
            api.updateSeries(editSeries)
                .then((res) => {
                    if (this._isMounted) {
                        this.setState({ isLoading: true })
                        this.props.history.push('/series/' + editSeries.genre);
                    }
                })
        } else if (isValidVideo === false) {
            alert("Por favor, entre com uma URL válida");
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    canBeSubmitted() {
        const errors = this.validateField(nameUpdate, urlVideoUpdate)
        const isDisabled = !Object.keys(errors).some(x => errors[x])
        return isDisabled
    }

    handleNameChange = event => {
        nameUpdate = this.refs.name.value
        this.setState({
            name: nameUpdate
        })
    }

    handleUrlVideoChange = event => {
        urlVideoUpdate = this.refs.urlVideo.value
        this.setState({
            urlVideo: urlVideoUpdate
        })
    }

    handleBur = field => event => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        })
    }

    render() {
        const errors = this.validateField(nameUpdate, urlVideoUpdate)
        const isDisabled = Object.keys(errors).some(x => errors[x])

        const shouldMarkError = field => {
            const hasError = errors[field]
            const shouldShow = this.state.touched[field]

            return hasError ? shouldShow : false
        }

        return (
            <section className='intro-new-edit'>
                {this.state.redirect &&
                    <Redirect to={this.state.redirect} ></Redirect>
                }
                <h1 className="h1AddEdit">Editar série</h1>
                <form>
                    <div className="intro-group">
                        <p className="text-truncate">Nome *</p>
                        <input
                            placeholder="Entre com o nome do filme... *"
                            ref='name'
                            className={shouldMarkError('name') ? 'error' : '' + 'inputNewEditSeries'}
                            onChange={this.handleNameChange}
                            defaultValue={this.state.series.name}
                            onBlur={this.handleBur('name')}
                        /> <br />
                    </div>
                    <div className="intro-group">
                        <p className="text-truncate">Genêro *</p>
                        <select ref="genre" required >
                            {
                                this.state.genres
                                    .map(key => <option defaultValue={this.state.series.genre} key={key} value={key}>{key} </option>)
                            }
                        </select> <br />
                    </div>
                    <p className="text-truncate">Descrição</p> <textarea ref="comment" defaultValue={this.state.series.comment} placeholder="Adicione uma descrição ;)" /> <br />
                    <div className="statusGenres">
                        <img src={this.state.series.img} width="400" height="300"></img> <br /> <br />
                    </div>
                    <p className="text-truncate">URL do pôster *</p> <input type="text" ref="urlImage" defaultValue={this.state.series.img} placeholder="Adicione o link da URL da imagem" /> <br />
                    <div className="intro-group">
                        <p className="text-truncate">URL do vídeo *</p>
                        <input
                            placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo... *"
                            ref='urlVideo'
                            className={shouldMarkError('urlVideo') ? 'error' : '' + 'inputNewEditSeries'}
                            onChange={this.handleUrlVideoChange}
                            defaultValue={this.state.series.video}
                            onBlur={this.handleBur('urlVideo')}
                        /> <br />
                    </div>
                    <button disabled={isDisabled} type="button" onClick={this.saveSeries} className="btn btn-primary btn-lg">Salvar</button>
                </form>
            </section>
        )
    }
}

export default EditSeries