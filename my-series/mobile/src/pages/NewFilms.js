import React, {Component} from 'react'
import { View, Text } from 'react-native'

class NewFilms extends Component {

    static navigationOptions = {
        drawerLabel : "Nova série"
    }

    render(){
        return (
            <View><Text>New Films</Text></View>
        )
    }

}

export default NewFilms