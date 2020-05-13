import React, { useState, useEffect } from 'react'
import { NavigationEvents } from 'react-navigation';
import { Container, Header, Left, Right, Icon, Body, Button, Title } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import api from '../services/api'
import Toast from 'react-native-simple-toast';
import { ScrollView } from 'react-native-gesture-handler';

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

function Films({ route, navigation }) {
    const genreOld = route.params.item.genreOld
    const [films, setFilms] = useState([])

    useEffect(() => {
        loadFilms()
    }, [])

    async function loadFilms() {
        const response = await api.get(`films?genre=${genreOld}`)

        setFilms(response.data)
    }

    handleFavorite = (item) => {
        addFavorite(item)
    }

    async function addFavorite(item) {
        const editFilm = {
            id: item.id,
            name: item.name,
            comment: item.comment,
            status: item.status,
            genre: 'favorite',
            genreOld: item.genre,
            img: item.img,
            nameImage: item.nameImage,
            video: item.video
        }

        await api.put('films/' + editFilm.id, editFilm)
            .then((res) => {
                loadFilms()
            })
        Toast.showWithGravity('Adicionado aos favoritos', Toast.SHORT, Toast.BOTTOM);
        await navigation.navigate('Favorite', { params: route })
    }

    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' style={styles.icon} onPress={() => navigation.goBack() } />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.icon}>Filmes</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                    </Button>
                </Right>
            </Header>
            {films.length === 0 &&
                <View>
                    <Text style={styles.textEmptyFilm}>Nenhum filme cadastrado</Text>
                </View>
            }
            <ScrollView>
                <>
                    {films.map(film => (
                        <View style={styles.content}>
                            <TouchableOpacity key={film.id} style={styles.imgGenreView} >
                                <Image source={{ uri: `http://10.0.2.2:3000/images/${film.nameImage}` }} style={styles.imgGenre} />
                                <Title style={styles.name}>{film.name}</Title>
                                <Text style={styles.status}>{film.genre} / {statuses[film.status]}</Text>
                                <View style={styles.containerButton}>
                                    <Button rounded info style={styles.button} onPress={() => this.handleFavorite(film)}><Text style={{ paddingHorizontal: 17, fontWeight: 'bold', color: '#FFFFFF', textShadowRadius: 5, fontSize: 15, textShadowColor: '#000000' }}>Favoritos</Text></Button>
                                    <Button rounded bordered style={styles.button}><Text style={{ paddingHorizontal: 28, fontWeight: 'bold', color: '#007bff', fontSize: 15 }}>Editar</Text></Button>
                                    <Button rounded danger style={styles.button}><Text style={{ paddingHorizontal: 27, fontWeight: 'bold', color: '#FFFFFF', fontSize: 15, textShadowRadius: 5, textShadowColor: '#000000' }}>Excluir</Text></Button>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                    }
                </>
            </ScrollView>
        </Container>

    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#343A40'
    },
    container: {
        backgroundColor: '#1C1C1C'
    },
    icon: {
        marginTop: 20
    },
    content: {
        borderColor: '#000000',
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        marginTop: 3,
        paddingBottom: 7,
        marginTop: 5
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

export default Films
