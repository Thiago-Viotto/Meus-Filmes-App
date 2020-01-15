import React, {Component} from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

class Home extends Component {

    static navigationOptions = {
        drawerLabel : "Home",

        drawerIcon: ({ focused, tintColor }) => (
            <Image  
                style={styles.logo}
                style={{ width: 400, height: 40}}
                source={require('../../assets/logo.png')}
            />
        )
    }

    render(){
        return (
            <View><Text>Home</Text></View>
        )
    }

}

const styles = StyleSheet.create({
    logo: {
        width: 400,
        height: 100,
        borderRadius: 100
    }
})

export default Home