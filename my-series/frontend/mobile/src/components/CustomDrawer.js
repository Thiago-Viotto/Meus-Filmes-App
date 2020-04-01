import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'
import { DrawerNavigatorItems } from 'react-navigation-drawer'

function CustomDrawer({ ...props }) {
    return (
        <View>
            <View style={styles.drawer}>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>

        <DrawerNavigatorItems {...props} />
        </View>
    )
}



const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#343A40'
    },
    logo: {
        width: 200,
        height: 30,
        borderRadius: 100,
        marginTop: 15,
        marginBottom: 10
    }
})

export default CustomDrawer