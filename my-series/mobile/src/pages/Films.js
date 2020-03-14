import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import api from '../services/api'

function Films({ route, navigation }) {
    const item = route.params.item.genre
    console.log(item)
    const [films, setFilms] = useState([])

    useEffect(() => {
        async function loadFilms() {
            const response = await api.get(`films?genre=${item}`)

            console.log(response.data)
            setFilms(response.data)
        }
        loadFilms()
    }, [])

    return (
        <>
            {films.map(film => (
                <TouchableOpacity key={film.id} style={styles.imgGenreView}>
                    <Text>{film.img}</Text>
                    <Image source={require('../../../frontend/public/images/logo.png')} style={styles.imgGenre} />
                </TouchableOpacity>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
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

export default Films
