import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

export default function loading() {
    const [loading, setLoading] = useState(true)

    function closeActivityIndicator() {
        setTimeout(() => {  
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        closeActivityIndicator()
    })

    return(
        <ActivityIndicator
            animating={loading}
            size="large"
            color='#0000ff'
            style={styles.activityIndicator}
        ></ActivityIndicator>
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})