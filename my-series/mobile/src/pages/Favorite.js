import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Container, Button, Title } from 'native-base'
import api from '../services/api'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'
import Loading from '../components/Loading'
import HeaderComponent from '../components/HeaderComponent'

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

function Favorite({ route, navigation }) {
    const [films, setFilms] = useState([])
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFilms()
    }, [isFocused])

    async function loadFilms() {
        const response = await api.get('films?genre=favorite')

        setLoading(false)
        setFilms(response.data)
    }

    async function removeFavorite(film) {
        const updateFilm = {
            id: film.id,
            name: film.name,
            comment: film.comment,
            status: film.status,
            genre: film.genreOld,
            genreOld: film.genreOld,
            img: film.img,
            nameImage: film.nameImage,
            video: film.video
        }

        await api.put('films/' + updateFilm.id, updateFilm)
            .then((res) => {
                loadFilms()
            })
        Toast.showWithGravity('Removido dos favoritos', Toast.SHORT, Toast.BOTTOM);
    }

    return (
        <>
            {loading &&
                <Loading />
            }
            {!loading &&
                <Container style={styles.container}>
                    <HeaderComponent text='Favoritos' />
                    {films.length === 0 &&
                        <View>
                            <Text style={styles.textEmptyFilm}>Nenhum filme cadastrado</Text>
                        </View>
                    }
                    <ScrollView>
                        <>
                            {films.map(film => (
                                <View key={film.id} style={styles.content}>
                                    < TouchableOpacity style={styles.imgGenreView} >
                                        <Image source={{ uri: `http://10.0.2.2:3000/images/${film.nameImage}` }} style={styles.imgGenre} />
                                        <Title style={styles.name}>{film.name}</Title>
                                        <Text style={styles.status}>{film.genre} / {statuses[film.status]}</Text>
                                        <View style={styles.containerButton}>
                                            <Button rounded info style={styles.button} onPress={() => navigation.navigate('VideoFilms', { screen: 'VideoFilms', params: { film } })}><Text style={{ paddingHorizontal: 17, fontWeight: 'bold', color: '#FFFFFF', textShadowRadius: 5, fontSize: 15, textShadowColor: '#000000' }}>Assistir</Text></Button>
                                            <Button rounded danger style={styles.button} onPress={() => removeFavorite(film)}><Text style={{ paddingHorizontal: 27, fontWeight: 'bold', color: '#FFFFFF', fontSize: 15, textShadowRadius: 5, textShadowColor: '#000000' }}>Excluir</Text></Button>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                            }
                        </>
                    </ScrollView>
                </Container>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1C1C'
    },
    content: {
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        marginTop: 3,
        paddingBottom: 7
    },
    imgGenre: {
        width: '100%',
        maxWidth: 330,
        height: 200,
        marginTop: 8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    imgGenreView: {
        alignItems: 'center',
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: 5
    },
    button: {
        alignItems: 'center',
        marginRight: 10,
        width: 100,
        height: 40
    },
    name: {
        color: '#000000',
        marginBottom: 3
    },
    textEmptyFilm: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 10
    }
})
export default Favorite
