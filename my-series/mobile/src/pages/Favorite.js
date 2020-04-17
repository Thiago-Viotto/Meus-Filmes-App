import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack';
import { Container, Header, Left, Right, Icon, Body, Button, Title } from 'native-base'
import api from '../services/api'
import { ScrollView } from 'react-native-gesture-handler';

const statuses = {
    "watched": "Assistido",
    "watching": "Assistindo",
    "toWatch": "Assistir"
}

function Favorite({ route, navigation }) {
    const [films, setFilms] = useState([])

    useEffect(() => {
        loadFilms()
    }, [])

    async function loadFilms() {
        const response = await api.get('films?genre=favorite')

        console.log(response.data)
        setFilms(response.data)
    }

    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' style={styles.icon} onPress={() => navigation.goBack(null)} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.icon}>Meus Favoritos</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name='menu' style={styles.icon} onPress={() => this.props.navigation.openDrawer()} />
                    </Button>
                </Right>
            </Header>
            <ScrollView>
                <>
                    {films.map(film => (
                        <View style={styles.content}>
                            < TouchableOpacity key={film.id} style={styles.imgGenreView} >
                                <Image source={{ uri: `http://10.0.3.2:3000/images/${film.nameImage}` }} style={styles.imgGenre} />
                                <Title style={styles.name}>{film.name}</Title>
                                <Text style={styles.status}>{film.genre} / {statuses[film.status]}</Text>
                                <View style={styles.containerButton}>
                                    <Button rounded info style={styles.button}><Text style={{ paddingHorizontal: 17, fontWeight: 'bold', color: '#FFFFFF', textShadowRadius: 5, fontSize: 15, textShadowColor: '#000000' }}>Favoritos</Text></Button>
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
    }
})
export default Favorite
