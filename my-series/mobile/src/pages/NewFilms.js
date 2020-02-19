import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack';
import { Container, Header, Left, Right, Icon, Body, Button, Title } from 'native-base'

class NewFilms extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props

        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' style={styles.icon} onPress={() => navigation.goBack(null)} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.icon}>Novos Filmes</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' style={styles.icon} onPress={() => this.props.navigation.openDrawer()} />
                        </Button>
                    </Right>
                </Header>
            </Container>
        )
    }

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
})
export default NewFilms
