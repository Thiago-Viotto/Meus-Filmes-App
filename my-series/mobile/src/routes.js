import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { DrawerItems } from 'react-navigation'
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native'
import CustomDrawer from './components/CustomDrawer'

import Home from './pages/Home'
import Films from './pages/Films'
import NewFilms from './pages/NewFilms'
import EditFilms from './pages/EditFilms'
import Favorite from './pages/Favorite'
import VideoFilms from './pages/VideoFilms'

const Routes = createDrawerNavigator({
    Home,
    NewFilms,
    Favorite
}, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer
})

export default createAppContainer(Routes)