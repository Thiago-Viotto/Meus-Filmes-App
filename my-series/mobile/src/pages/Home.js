import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, FlatList } from 'react-native'
import { Body, Container } from 'native-base'

import HeaderDrawer from './HeaderDrawer'

const { width } = Dimensions.get('window');

renderItem = ({ item }) => {
    return (<View>
        <Image source={item.avatar} style={styles.imgGenre} />
    </View>)
}

export default function Home({ navigation }) {
    const [imageGenres, setImageGenres] = useState([
        {
            id: 0,  // key
            avatar: require('../../assets/imgGenres/comedia.jpg'),
        },
        {
            id: 1,  // key
            avatar: require('../../assets/imgGenres/drama.jpg')
        },
        {
            id: 2,  // key
            avatar: require('../../assets/imgGenres/acao.jpg')
        },
        {
            id: 3,  // key
            avatar: require('../../assets/imgGenres/animaçao.jpg')
        },
        {
            id: 4,  // key
            avatar: require('../../assets/imgGenres/aventura.jpg')
        },
        {
            id: 5,  // key
            avatar: require('../../assets/imgGenres/ficçaoCientifica.jpg')
        },
        {
            id: 6,  // key
            avatar: require('../../assets/imgGenres/romance.jpeg')
        },
        {
            id: 7,  // key
            avatar: require('../../assets/imgGenres/suspense.jpg')
        },
        {
            id: 8,  // key
            avatar: require('../../assets/imgGenres/terror.jpg')
        },
    ]);

    return (
        <View style={styles.container}>
            <HeaderDrawer navigation={navigation} />
            <ImageBackground style={styles.capa} source={require('../../assets/capa.jpg')}>
                <Body>
                    <Image style={styles.logo} source={require('../../assets/logo.png')} />
                    <Text style={styles.slogan}>Nunca mais esqueça uma série que você assistiu ou que alguém lhe indicou.</Text>
                </Body>
            </ImageBackground>

            <FlatList
                keyExtractor={(item) => item.id}
                data={imageGenres}
                renderItem={({ item }) => (
                    <View style={styles.imgGenreView}>
                        <Image source={item.avatar} style={styles.imgGenre} />
                    </View>
                )}
            />
        </View>
    )
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
    iconMovie: {
        width: 24,
        height: 24
    },
    slogan: {
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 1 },
        textShadowRadius: 10,
        fontWeight: 'bold',
    },
    imgGenre: {
        width: '100%',
        maxWidth: 330,
        height: 200,
        marginTop: 8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8
    },
    imgGenreView: {
        alignItems: 'center',
    }
})
