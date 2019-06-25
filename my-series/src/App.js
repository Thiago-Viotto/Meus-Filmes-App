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

const About = () => <p>Sobre</p>

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav id="menuColor" className="navbar navbar-default navbar-fixed-top" role="navigation">
            <div className="container">
              <div className="navbar-header page-scroll">
                <a className="navbar-brand page-scroll" href="#page-top">
                  <img src="/images/logo.png" height="30" />
                </a>
              </div>
              <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to='/'><h4 className="titlesMenu">Home</h4></Link>
                  </li>
                  <li>
                    <Link to='/new'><h4 className="titlesMenu">Nova Série</h4></Link>
                  </li>
                  <li>
                    <Link to='/series/favorite'><h4 className="titlesMenu">Meus favoritos</h4></Link>
                  </li>
                  <li>
                    <Link to='/about'><h4 className="titlesMenu">Sobre</h4></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Route exact path='/' component={Home} />
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
