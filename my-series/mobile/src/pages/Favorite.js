import React, {Component} from 'react'
import { View, Text } from 'react-native'

class Favorite extends Component {

    static navigationOptions = {
        drawerLabel : "Meus Favoritos"
    }

    render(){
        return (
            <View><Text>Favorite</Text></View>
        )
    }

}

export default Favorite