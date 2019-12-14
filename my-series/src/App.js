import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import Home from '../src/Home'
import NewSeries from '../src/NewSeries'
import EditSeries from '../src/EditSeries'
import Series from '../src/Series'
import Favorite from '../src/Favorite'
import VideoSeries from '../src/VideoSeries'

const About = () => <p>Sobre</p>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav id="menuColor" className="navbar navbar-expand-lg bg-dark navbar-dark" role="navigation">
              <div className="container">
                <div className="navbar-header page-scroll">
                  <a className="navbar-brand page-scroll" href="/">
                    <img src="/images/logo.png" height="30" style={{marginTop: '2px'}} />
                  </a>
                </div>
            <button className="navbar-toggler navbar-right" type="button" data-toggle="collapse" data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado" aria-expanded="false" aria-label="Alterna navegação" style={{backgroundColor: "#A4A4A4", marginRight: "30px"}}>
              <span className="navbar-toggler-icon" style={{backgroundColor: "#A4A4A4"}}></span>
            </button>

            <div className="collapse navbar-collapse" id="conteudoNavbarSuportado">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to='/new'><h4 className="titlesMenu">Nova Série</h4></Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/series/favorite'><h4 className="titlesMenu">Meus favoritos</h4></Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/about'><h4 className="titlesMenu">Sobre</h4></Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Route exact path='/' component={Home} />
            <Route path='/series-video:id' component={VideoSeries} />
            <Route path='/series-edit:id' component={EditSeries} />
            <Route path='/series/:genre' component={withRouter(Series)} />
            <Route path='/series/favorite' component={Favorite} />
            <Route exact path='/about' component={About} />
            <Route exact path='/new' component={NewSeries} />
        </div>
      </Router>
        )
      }
    }
    
    export default App
