import React, {Component} from 'react'
import { View, Text } from 'react-native'

import Home from './Home'

class EditFilms extends Component {
    
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        header : null
    }

    render(){
        const {navigation} = this.props
        return (
            <Home navigation={navigation} />
        )
    }

}

export default EditFilms