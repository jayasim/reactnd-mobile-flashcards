import React from "react"
import { Text, View, StatusBar, Dimensions } from "react-native"
import styled from "styled-components/native"
import { Button, Spinner } from "nachos-ui"
import reducer from "./reducers"
import { createStore } from "redux"
import { Provider } from "react-redux"


const OnboardingScreen = {
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      header: null
    }
  }
}

const StackScreens = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetailScreen,
    navigationOptions: {
      header: null,
      title:"Deck Detail"
    }
  },
  NewQuestion: {
    screen: NewQuestionScreen,
    header: {
      title: <Text>Add a New Question</Text>
    }
  },
  NewDeck: {
    screen: NewDeckScreen
  }
}

let AllScreens = false
let MainNavigator = false

API.getUnboardingSeen().then(seen => {
  if (seen) {
    AllScreens = StackScreens
  } else {
    AllScreens = Object.assign(OnboardingScreen, StackScreens)
  }
  MainNavigator = StackNavigator(AllScreens)
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>{AllScreens && <MainNavigator />}</View>
      </Provider>
    )
  }
}
