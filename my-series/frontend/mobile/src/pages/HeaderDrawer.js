import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon, Body, Button } from 'native-base'

class HeaderDrawer extends Component {
    
    constructor(props){
        super(props)
    }
    
    static navigationOptions = {
        drawerLabel: "Home",
        drawerBackgroundColor: '#FFFFFF',
    }

    render() {
        return (
            <ScrollView style={styles.container}>
            <View>
                <Header style={styles.header} noShadow>
                    <Body>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                    </Body>
                    <Right>
                        <Button transparent >
                            <Icon style={styles.icon} name='menu' onPress={() => this.props.navigation.openDrawer()} />
                        </Button>
                    </Right>
                </Header>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Home</Text>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1C'
    },
    logo: {
        width: 150,
        height: 50,
        borderRadius: 100,
        resizeMode: "center",
        marginTop: 20
    },
    header: {
        backgroundColor: '#343A40',
        height: 70
    },
    icon: {
        marginTop: 20
    },
    iconMovie: {
        width: 24,
        height: 24
    }
})

export default HeaderDrawer