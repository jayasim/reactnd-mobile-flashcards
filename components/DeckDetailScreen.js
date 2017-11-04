import React, { Component } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import * as API from "./../utils/api"
import {
  Container,
  Content,
  H3,
  Text,
  Button,
  Footer,
  FooterTab,
  Header,
  Body,
  Icon,
  Left,
  Right,
  Title
} from "native-base"

class DeckDetailScreen extends Component {
  componentDidMount() {
    API.saveLastScreenVisited("deckDetail", this.props.deck.key)
  }

  goBack() {
    API.saveLastScreenVisited("home", false).then(() =>
      this.props.navigation.navigate("Home")
    )
    return false
  }

  render() {
    const { deck } = this.props
    const key = deck.key

    const deckTitle = { fontSize: 37, fontWeight: "700" }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{deck.name}</Title>
          </Body>
          <Right />
        </Header>

        <Body
          style={{
            alignItems: "stretch",
            alignSelf: "stretch",
            padding: 40,
            justifyContent: "space-between"
          }}
        >
          <View style={{ marginTop: 14 }}>
            <H3>deck name:</H3>
            <Text style={deckTitle}>{deck.name}</Text>
            <H3>{deck.questions.length.toString()} questions</H3>
          </View>

          <Footer
            style={{
              justifyContent: "center",
              backgroundColor: null,
              borderTopWidth: null
            }}
          >
            <Button
              onPress={() =>
                this.props.navigation.navigate("NewQuestion", {
                  deckKey: key
                })}
            >
              <Text>Add a Question</Text>
            </Button>
          </Footer>
        </Body>
        {deck.questions.length > 0 && (
          <Footer style={{ height: 68, padding: 12 }}>
            <Button
              success
              style={{ padding: 30, height: 44 }}
              onPress={() =>
                this.props.navigation.navigate("Game", {
                  deckKey: key
                })}
            >
              <H3 style={{ color: "#FFF" }}>🚀 Take the Quiz!</H3>
            </Button>
          </Footer>
        )}
      </Container>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckIndex } = navigation.state.params

  return {
    navigation,
    deckIndex,
    deck: state.decks[deckIndex]
  }
}

export default connect(mapStateToProps)(DeckDetailScreen)
