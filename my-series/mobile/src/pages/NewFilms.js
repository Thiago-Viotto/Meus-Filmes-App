import React, {Component} from 'react'
import { View, Text } from 'react-native'

class NewFilms extends Component {

    static navigationOptions = {
        header : null
    }

    render(){
        return (
            <View><Text>New Films</Text></View>
        )
    }

}

export default NewFilms