import React, { Component } from 'react'
import api from './api'
import { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { InputGroup, FormControl } from 'react-bootstrap'

const status = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

class NewSeries extends Component {
    _isMounted = false;
    isInvalidName = false;

    constructor(props) {
        super(props)

        this.state = {
            genres: [],
            series: [],
            isLoading: false,
            redirect: false,
            selectedFile: null,
            persons: [],
            name: '',
            errors: {
                name: false
            },
            touched: {
                name: false
            }

        }

        const isEnabled = this.state.name.length > 0

        this.saveSeries = this.saveSeries.bind(this)
        this.notify = this.notify.bind(this)
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

    validateName(name) {
        return {
            name: name.length === 0
        }
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

    saveSeries = event => {
        if(!this.canBeSubmitted()){
            event.preventDefault()
            return
        }
        const data = new FormData()
        data.append('file', this.state.selectedFile)

        axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
            })

        let valueURLImg = 'http://localhost:3000/images/' + this.state.selectedFile.name

        const newSeries = {
            name: this.refs.name.value,
            comment: this.refs.comment.value,
            status: 'toWatch',
            genre: this.refs.genre.value,
            img: valueURLImg,
            video: this.refs.urlVideo.value
        }

        let isValidName = this.validName(newSeries.name)
        let isValidVideo = this.validURL(newSeries.video)

        // Check invalid name
        if (isValidName === false) {
            this.isInvalidName = true
        }

        if ((isValidVideo === true) && (isValidName === true)) {

            api.saveSeries(newSeries)
                .then((res) => {
                    if (this._isMounted) {
                        this.notify(newSeries)
                        setTimeout(() => {
                            this.setState({
                                redirect: '/series/' + newSeries.genre,
                            }
                            )
                        }, 2000);
                    }
                })
        } else if (isValidVideo === false) {
            alert("Por favor, entre com uma URL válida");
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    notify(newSeries) {
        toast.success('O filme ' + '"' + newSeries.name + '"' + ' foi adicionado com sucesso', { autoClose: 1500 });
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    canBeSubmitted(){
        const errors = this.validateName(this.state.name)
        const isDisabled = !Object.keys(errors).some(x => errors[x])
        return !isDisabled
    }

    handleNameChange = event => {
        this.setState({name: event.target.value})
    }

    handleBur = field => event => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        })
    }

    render() {
        const errors = this.validateName(this.state.name)
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
                <h1 className="h1AddEdit">Nova série</h1>
                <form>
                    <div className="intro-group">
                        Nome *
                        <FormControl
                            placeholder="Entre com o nome do filme... *"
                            ref='name'
                            className={shouldMarkError('name') ? 'error' : ''}
                            onChange={this.handleNameChange}
                            value={this.state.name}
                            onBlur={this.handleBur('name')}
                        /> <br />
                    </div>

                    <div className="intro-group">
                        Genêro *
                    <select className='form-control' ref="genre" required>
                            {
                                this.state.genres
                                    .map(key => <option key={key} value={key}>{key}</option>)
                            }
                        </select> <br /> 
                    </div>
                    Descrição <textarea ref="comment" className="form-control" placeholder="Adicione uma descrição ;)" /> <br />
                    Faça upload do pôster * <input type="file" name="file" onChange={this.onChangeHandler} /> <br />
                    URL do vídeo * <input type="text" ref="urlVideo" className="form-control" placeholder="Adicione um link do youtube, daylomotion, facebook ou vimeo" /> <br />
                    <ToastContainer />
                    <button disabled={isDisabled} type="button" onClick={this.saveSeries} className="btn btn-primary">Adicionar</button> <br /> <br />
                </form>
            </section>
        )
    }
}

export default NewSeries