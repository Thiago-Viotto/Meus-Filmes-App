import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './pages/Home'
import Films from './pages/Films'
import NewFilms from './pages/NewFilms'
import EditFilms from './pages/EditFilms'
import Favorite from './pages/Favorite'
import VideoFilms from './pages/VideoFilms'

const Routes = createStackNavigator({
    Home,
    Films,
    NewFilms,
    EditFilms,
    Favorite,
    VideoFilms
})

export default createAppContainer(Routes)