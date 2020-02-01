import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { Header, Left, Right, Icon, Body, Button } from 'native-base'

import HeaderDrawer from './HeaderDrawer'

class Home extends Component {    
    constructor(props){
        super(props)
    }

    render(){
        const {navigation} = this.props

        return (
            <View style={styles.container}>
                <HeaderDrawer navigation={navigation} />
                <ImageBackground style={styles.capa} source={require('../../assets/capa.jpg')}>
                    <Body>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        <Text style={styles.slogan}>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</Text>
                    </Body>
                </ImageBackground>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
    },
    capa: {
        width: '100%',
        height: 115,
        marginTop: -16
    },
    logo: {
        width: 300,
        height: 50,
        resizeMode: "center",
        marginTop: 25
    },
    slogan:{
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -3, height: 1},
        textShadowRadius: 10,
        fontWeight: 'bold',
    }
})

export default Home