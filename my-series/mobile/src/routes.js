import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeRouter, Route, Link } from "react-router-native";

import Home from './pages/Home'
import Films from './pages/Films'
import NewFilms from './pages/NewFilms'
import EditFilms from './pages/EditFilms'
import Favorite from './pages/Favorite'
import VideoFilms from './pages/VideoFilms'

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Home'>
                <Drawer.Screen name='Home' component={Home} />
                <Drawer.Screen name='NewFilms' component={NewFilms} options={{ drawerLabel: 'Novo Filme' }} />
                <Drawer.Screen name='Favorite' component={Favorite} options={{ drawerLabel: 'Meus Favoritos' }} />
            </Drawer.Navigator>
        </NavigationContainer>
        <NativeRouter>
            <Route exact path='/' component={Home} />
            <Route path='/films-video:id' component={VideoFilms} />
            <Route path='/films-edit:id' component={EditFilms} />
            <Route path='/films/:genre' component={Films} />
            <Route path='/films/favorite' component={Favorite} />
            <Route exact path='/new' component={NewFilms} />
        </NativeRouter>
        </>
    )
}
