import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header, Left, Right, Icon, Body, Button, StyleSheet } from 'native-base'

import Home from './Home'

class NewFilms extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        headerLeft: null
    }

    render() {
        const { navigation } = this.props

        return (
            <View>
                <Home navigation={navigation}  />
                <Text style={{ color: '#FFFFFF' }}>New Films</Text>
            </View>
        )
    }

}


export default NewFilms