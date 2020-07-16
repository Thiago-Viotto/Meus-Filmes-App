import React from 'react'
import { Button, Left, Body, Right, Header, Icon, Title } from 'native-base'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function HeaderComponent(props){
    const navigation = useNavigation()

    return(
        <Header style={styles.header}>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' style={styles.icon} onPress={() => navigation.goBack()} />
                </Button>
            </Left>
            <Body>
                <Title style={styles.icon}>{props.text}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name='menu' style={styles.icon} onPress={() => navigation.openDrawer()} />
                </Button>
            </Right>
        </Header>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#343A40'
    },
    icon: {
        marginTop: 20
    },
})