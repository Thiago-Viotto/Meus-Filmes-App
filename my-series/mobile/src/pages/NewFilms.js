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
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={() => navigation.goBack(null)} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
            </Container>
        )
    }

}

export default NewFilms
