import React, { Component } from "react"
import { View, StyleSheet } from "react-native"
import { Container, Content, Body, Text, Button } from "native-base"

export default class NoDecksScreen extends Component {
  render() {
    return (
      <Container>
        <Body>
          <Content>
            <Text style={styles.h1}>No Decks yet!</Text>
            <Text style={styles.h2}>Create as many decks as you want.</Text>
            <Text style={styles.h2}>Start Quiz! </Text>
            <Button
              style={{ marginTop: 42 }}
              onPress={() => this.props.navigation.navigate("NewDeck", {})}
            >
              <Text>Add Deck</Text>
            </Button>
          </Content>
        </Body>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 130
  },
  h2: {
    fontSize: 20,
    paddingTop: 14
  }
})
