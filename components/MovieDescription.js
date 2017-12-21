import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import colors from '../constants/colors'
import font from '../constants/fontFamily'

class MovieDescription extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <Text style={styles.title}>Overview</Text>
        <View
          style={{
            backgroundColor: colors.mediumRed,
            height: 2,
            width: 50,
            marginTop: 5,
            marginBottom: 8,
          }}
        />
        <Text style={styles.text}>{this.props.overview}</Text>
      </View>
    )
  }
}

export default MovieDescription

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontFamily: font.thin,
    fontSize: 18,
  },
  title: {
    colors: colors.black,
    fontFamily: font.regular,
    fontSize: 22,
  },
})
