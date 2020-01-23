import React, { Component } from 'react'
import { View, Text, SafeAreaView, ScrollView, Dimensions, Image, StyleSheet } from 'react-native'
import { Header, Left, Right, Icon } from 'native-base'
import { DrawerNavigatorItems } from 'react-navigation-drawer'

function CustomDrawer({ ...props }) {
    return (
        <View>
            <View style={styles.logo}>
                <Image source={require('../../assets/logo.png')} />
            <Text>Nova série</Text>
            <Text>Meus Favoritos</Text>
        </View>

        <DrawerNavigatorItems {...props} />
        </View>
    )
}



const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 50,
        borderRadius: 100,
        marginLeft: 200
    }
})

export default CustomDrawer