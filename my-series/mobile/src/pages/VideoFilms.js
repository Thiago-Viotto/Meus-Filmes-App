import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Body, Right, Header, Icon, Title } from 'native-base'
import { Video } from 'expo-av'
import YoutubePlayer from 'react-native-youtube-iframe'
import { Container } from 'native-base'

export default function VideoFilms({ route, navigation }) {
    const playerRef = useRef(null)
    const [playing, setPlaying] = useState(true)
    const [mute, setVolume] = useState(false)
    const [isYoutube, setIsYoutube] = useState(false)
    const filmName = route.params.params.film.name
    const url = route.params.params.film.video

    useEffect(() => {
        if (url.substring(0, 24) === 'https://www.youtube.com/') {
            setIsYoutube(true)
        }
    })

    return (
        <Container style={styles.container}>

            <Header style={{backgroundColor: '#343A40', height: 70}}>
                <Body>
                    <Title style={{marginTop: 20, marginLeft: 3}}>{filmName}</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='menu' style={{marginTop: 20}} onPress={() => navigation.openDrawer()} />
                    </Button>
                </Right>
            </Header>


            <View style={styles.videoContainer}>
                {isYoutube &&
                    <YoutubePlayer
                        ref={playerRef}
                        height={300}
                        width={400}
                        videoId={url}
                        play={false}
                        onChangeState={event => console.log(event)}
                        onReady={() => console.log("ready")}
                        onError={e => console.log(e)}
                        onPlaybackQualityChange={q => console.log(q)}
                        volume={50}
                        playbackRate={1}
                        playerParams={{
                            cc_lang_pref: "us",
                            showClosedCaptions: true
                        }}
                    />
                }
                {!isYoutube &&
                    <Video
                        source={{ uri: url }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        useNativeControls
                        style={{ width: 400, height: 300 }}
                    />
                }
            </View>
        </Container >
    )
}

const TopBar = ({ play, fullScreen }) => (
    <View
        style={{
            alignSelf: "center",
            position: "absolute",
            top: 0
        }}
    >
        <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
    </View>
);

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

