import React, {Component} from 'react'
import { View, Text } from 'react-native'

import HeaderDrawer from './HeaderDrawer'

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
            <HeaderDrawer navigation={navigation} />
        )
    }

}

export default Favorite