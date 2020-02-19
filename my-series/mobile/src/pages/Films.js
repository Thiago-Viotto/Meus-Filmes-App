import React, {Component} from 'react'
import { View, Text } from 'react-native'

import HeaderDrawer from './HeaderDrawer'

class Films extends Component {

    constructor(props){
        super(props)
    }

    static navigationOptions = {
        header : null
    }

    render(){
        const {navigation} = this.props
        return (
            <HeaderDrawer navigation={navigation} />
        )
    }

}

export default Films