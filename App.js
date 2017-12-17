import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Font } from 'expo'

import Navigation from './Navigation'

export default class App extends React.Component {
  state = {
    fonts: false,
  }
  componentDidMount() {
    Font.loadAsync({
      'raleway-extra-bold': require('./assets/Raleway-ExtraBold.ttf'),
      'raleway-bold': require('./assets/Raleway-Bold.ttf'),
      'raleway-regular': require('./assets/Raleway-Regular.ttf'),
      'raleway-thin': require('./assets/Raleway-Light.ttf'),
    }).then(() => this.setState({ fonts: true }))
  }
  render() {
    return this.state.fonts ? <Navigation /> : null
  }
}
