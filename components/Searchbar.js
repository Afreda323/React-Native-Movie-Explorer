import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet } from 'react-native'
import font from '../constants/fontFamily'
import colors from '../constants/colors'

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    focus: PropTypes.bool,
  }
  render() {
    return (
      <TextInput
        value={this.props.value}
        onChangeText={this.props.onChange}
        placeholder="Enter you search"
        placeholderTextColor={'#aaaaaa'}
        autoFocus={this.props.focus}
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
