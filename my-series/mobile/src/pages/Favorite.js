import React, {Component} from 'react'
import { View, Text } from 'react-native'

import Home from './Home'

class Favorite extends Component {
    
    constructor(props){
        super(props)
    }

    static navigationOptions = {
        drawerLabel : "Meus Favoritos",
    }

    render(){
        const {navigation} = this.props
        return (
            <Home navigation={navigation} />
        )
    }

}

export default Favorite