import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { Header, Left, Right, Icon, Body, Button } from 'native-base'

import Home from './Home'

class NewFilms extends Component {    
    constructor(props){
        super(props)
    }

    render(){
        const {navigation} = this.props

        return (
            <Home navigation={navigation} />
        )
    }

}

export default NewFilms