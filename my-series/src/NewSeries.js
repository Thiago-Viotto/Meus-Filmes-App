import React, { Component } from 'react'
import api from './Api'

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
            isLoading: false
        }
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

    render() {
        return (
            <section className='intro-section'>
                <h1>Nova série</h1>
                <form>
                    Nome: <input type="text" className="form-control" /> <br />
                    Status:
                        <select>
                        {Object.keys(status).map(key => <option key={key} value={key}>{status[key]}</option>)} 
                    </select> <br />
                    Genêro:
                    <select>
                        {
                            this.state.genres
                                .map(key => <option key={key} value={key}>{key}</option>)
                        }
                    </select> <br />
                    Comentários: <textarea className="form-control" /> <br />
                    Nome: <input type="text" className="form-control" /> <br />
                    Nome: <input type="text" className="form-control" /> <br />
                </form>
            </section>
        )
    }
}

export default NewSeries