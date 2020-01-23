import React, {Component} from 'react'
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon} from 'native-base'

class Home extends Component {

    static navigationOptions = {
        drawerLabel : "Home",
        /*
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style={{fontSize:24, color:tintColor}} />
        )    */
    }   

    render(){
        return (
            <View>
                <Header>
                    <Right>
                        <Icon name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ marginTop: 25}}/>
                    </Right>
                </Header>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Home</Text>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 50,
        borderRadius: 100,
        marginLeft: 200
    }
})

export default Home