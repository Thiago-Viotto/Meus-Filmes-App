import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Video } from 'expo-av'

export default function VideoFilms({ route, navigation }) {
    const url = route.params.params.film.video

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                isMuted={false}
                resizeMode='cover'
                shouldPlay
                style={styles.backgroundVideo}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300
    }
})

