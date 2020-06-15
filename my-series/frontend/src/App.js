import React, { Component } from 'react'
import Notification from 'react-notify-toast'

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import Home from '../src/Home'
import NewFilms from './pages/NewFilms'
import EditFilms from './pages/EditFilms'
import Films from './pages/Films'
import Favorite from './pages/Favorite'
import VideoFilms from './pages/VideoFilms'

const About = () => <p>Sobre</p>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Notification options={{zIndex: 200, top: 0}} />
          <nav id="menuColor" className="navbar navbar-expand-lg bg-dark navbar-dark" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <Link className="navbar-brand page-scroll" to="/">
                  <img src="/images/logo.png" height="30" style={{ marginTop: '2px' }} alt='logo escrito Meus Filmes' />
                </Link>
              </div>
              <button className="navbar-toggler navbar-right" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação" style={{ backgroundColor: "#A4A4A4", marginRight: "30px" }}>
                <span className="navbar-toggler-icon" style={{ backgroundColor: "#A4A4A4" }}></span>
              </button>

              <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to='/new'><h4 className="titlesMenu">Novo Filme</h4></Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/films/favorite'><h4 className="titlesMenu">Meus favoritos</h4></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Route exact path='/' component={Home} />
          <Route path='/films-video:id' component={VideoFilms} />
          <Route path='/films-edit:id' component={EditFilms} />
          <Route path='/films/:genre' component={withRouter(Films)} />
          <Route path='/films/favorite' component={Favorite} />
          <Route exact path='/new' component={NewFilms} />
        </div>
      </Router>
    )
  }
}

export default App
