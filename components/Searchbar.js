import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import font from '../constants/fontFamily'
import colors from '../constants/colors'

class Searchbar extends Component {
  render() {
    return (
      <TextInput
        placeholder="Enter you search"
        placeholderTextColor={'#aaaaaa'}
        autoFocus
        style={styles.input}
      />
    )
  }
}

export default Searchbar

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    backgroundColor: '#222',
    paddingHorizontal: 25,
    marginTop: 10,
    marginHorizontal: '10%',
    borderRadius: 50,
    color: colors.white,
    fontFamily: font.thin,
    fontSize: 18,
  },
})
