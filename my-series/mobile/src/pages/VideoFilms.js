import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Video } from 'expo-av'
import { Container } from 'native-base'
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import HeaderComponent from '../components/HeaderComponent'

export default function VideoFilms({ route, navigation }) {
    const [mute, setVolume] = useState(false)
    const filmName = route.params.params.film.name
    const url = route.params.params.film.video

    function setError(error) {
        alert('Erro ao carregar o vídeo ' + error)
    }

    function handleVolume() {
        setVolume(!mute)
    }

    return (
        <Container style={styles.container}>
            <HeaderComponent text={filmName} />
            <View style={styles.videoContainer}>
                <Video
                    source={{ uri: url }}
                    isMuted={false}
                    resizeMode='cover'
                    useNativeControls={true}
                    onError={(error) => setError(error)}
                    isMuted={mute}
                    style={styles.backgroundVideo}
                />
                <View style={styles.controlBar}>
                    <MaterialIcons
                        name={mute ? 'volume-mute' : 'volume-up'}
                        size={45}
                        color='white'
                        onPress={handleVolume}
                    />
                </View>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    WebViewStyle: {
        margin: 20
    },
    container: {
        backgroundColor: '#1C1C1C'
    },
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    controlBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    backgroundVideo: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 300
    }
})

