/* *******************************************************************
I created this onboarding slides totally inpired by this repo/example:
        https://github.com/narendrashetty/onboarding-RN
******************************************************************* */
import React, { Component } from "react"
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Image,
  Platform
} from "react-native"
import CircleTransition from "./CircleTransition"
import Swipe from "./Swipe"
import { Button, Text, Content, Body } from "native-base"
import { saveOnboardingSeen } from "./../utils/api"

const { width: windowWidth } = Dimensions.get("window")

const screens = [
  {
    id: 0,
    title: "Mobile Flashcards",
    subtitle: "A new way to learn",
    bgcolor: "#a0c1f7"
  },
  {
    id: 1,
    title: "How it works",
    subtitle: `1 - Start the quiz!
    2 - The quiz will allow users to create deck and add a card to a specific deck with unlimited number of cards!
    3 - 🤔 If you don't know the answer, the card will flip and show you the answer!
    4 - 😎 Users will be able to quiz themselves on a specific deck and receive a score once they're done.
    5. -  Users will receive a notification to remind themselves to study if they haven't already for that day.`,
    bgcolor: "#818ff4"
  },
  {
    id: 2,
    title: "Create Decks & Learn!",
    subtitle: "Use this app now! \n Create decks and learn cool stuff!",
    bgcolor: "#8cd183"
  }
]
export default class OnBoarding extends Component {
  componentWillMount() {
    saveOnboardingSeen()
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
      _counter: 0,
      currentTitle: screens[0].title,
      currentSubtitle: screens[0].subtitle,
      currentIcon: screens[0].icon,
      currentbg: screens[0].bgcolor
    }
    this.onSwipeLeft = this.onSwipeLeft.bind(this)
    this.onSwipeRight = this.onSwipeRight.bind(this)
  }

  componentDidMount() {
    this.animate.call(this)
  }

  animate() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 600
    }).start()
  }

  onSwipeLeft(gestureState) {
    const nextScreen = this.getNextScreen()
    const { _counter } = this.state
    let newCounter = _counter < screens.length - 1 ? _counter + 1 : 0

    this._swipeTo(nextScreen, newCounter)
  }

  onSwipeRight(gestureState) {
    const prevScreen = this.getPrevScreen()
    const { _counter } = this.state
    let newCounter = _counter === 0 ? screens.length - 1 : _counter - 1

    this._swipeTo(prevScreen, newCounter)
  }

  _swipeTo(newScreen, newCounter) {
    this.setState(
      {
        fadeAnim: new Animated.Value(0),
        _counter: newCounter
      },
      () => {
        this.changeContent.call(this, newScreen)
        this.circleTransition.start(
          newScreen.bgcolor,
          this.changeColor.bind(this, newScreen)
        )
        this.animate.call(this)
      }
    )
  }

  changeContent(newScreen) {
    this.setState({
      currentTitle: newScreen.title,
      currentSubtitle: newScreen.subtitle,
      currentIcon: newScreen.icon
    })
  }

  changeColor(newScreen) {
    this.setState({
      currentbg: newScreen.bgcolor
    })
  }

  getCurrentScreen() {
    return screens[this.state._counter]
  }

  getNextScreen() {
    if (this.state._counter < screens.length - 1) {
      return screens[this.state._counter + 1]
    } else {
      return screens[0]
    }
  }

  getPrevScreen() {
    if (this.state._counter === 0) {
      return screens[screens.length - 1]
    } else {
      return screens[this.state._counter - 1]
    }
  }

  renderNav() {
    let { fadeAnim } = this.state

    return (
      <View style={styles.footer}>
        {screens.map((screen, key) => (
          <Animated.View
            key={key}
            style={[
              {
                width: 15,
                height: 15,
                borderRadius: 15,
                borderColor: "#fff",
                borderWidth: 2,
                marginRight: 5,
                opacity: 0.6,
                backgroundColor: "transparent"
              },
              key === this.state._counter && {
                backgroundColor: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["transparent", "#fff"]
                })
              }
            ]}
          />
        ))}
      </View>
    )
  }

  renderMain() {
    let { fadeAnim } = this.state
    return (
      <Swipe
        style={styles.main}
        onSwipeLeft={this.onSwipeLeft}
        onSwipeRight={this.onSwipeRight}
      >
        <Animated.View
          style={[
            styles.body,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }
              ]
            }
          ]}
        >
          <Image source={this.state.currentIcon} style={styles.pageIcon} />

          <Text
            style={[
              styles.title,
              Platform.OS === "ios" && {
                fontFamily: "Avenir Next"
              }
            ]}
          >
            {this.state.currentTitle}
          </Text>
          <Text
            style={[
              styles.subtitle,
              Platform.OS === "ios" && {
                fontFamily: "Avenir Next"
              }
            ]}
          >
            {this.state.currentSubtitle}
          </Text>
        </Animated.View>
        {this.renderButton()}
        {this.renderNav()}
      </Swipe>
    )
  }

  renderButton = () => {
    return (
      <View style={styles.launchButton}>
        <Body>
          <Button onPress={() => this.props.navigation.navigate("Home")}>
            <Text>Start Quiz!</Text>
          </Button>
        </Body>
      </View>
    )
  }

  render() {
    let { nextbg, currentbg } = this.state

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { backgroundColor: currentbg }]}>
          {this.renderMain()}
          <CircleTransition
            ref={circle => {
              this.circleTransition = circle
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    flex: 1,
    flexDirection: "column",
    zIndex: 10
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20
  },
  launchButton: {
    height: 60
  },
  footer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pageIcon: {
    width: windowWidth / 2,
    height: windowWidth / 2,
    marginBottom: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
    backgroundColor: "transparent"
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
    backgroundColor: "transparent"
  }
})
