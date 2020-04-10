import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
const Stack = createStackNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name='Root' component={Root} options={{ drawerLabel: 'Home' }} />
            <Drawer.Screen name='NewFilms' component={NewFilms} options={{ drawerLabel: 'Novo Filme' }} />
            <Drawer.Screen name='Favorite' component={Favorite} options={{ drawerLabel: 'Meus Favoritos' }} />
        </Drawer.Navigator>
    )
}

function Root() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}} />
            <Stack.Screen name='Films' component={Films} options={{headerShown: false, cardStyle: { backgroundColor: '#000000' }}}/>
        </Stack.Navigator>
    )
}
