import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import font from '../constants/fontFamily'
import colors from '../constants/colors'
import { LinearGradient } from 'expo'
import { Ionicons } from '@expo/vector-icons'

class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    focus: PropTypes.bool,
  }
  render() {
    return (
      <View style={styles.wrap}>
        <LinearGradient
          colors={['rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: '120%',
            zIndex: 2,
          }}
        />
        <View style={styles.iconLeft}>
          <Ionicons name="ios-search" size={25} color={colors.white} />
        </View>
        <TextInput
          value={this.props.value}
          onChangeText={this.props.onChange}
          placeholder="Enter your search"
          placeholderTextColor={'#aaaaaa'}
          autoFocus={this.props.focus}
          style={styles.input}
        />
        {this.props.value.length > 0 && (
          <TouchableOpacity
            onPress={this.props.onClear}
            style={styles.iconRight}>
            <Ionicons
              backgroundColor="transparent"
              name="ios-close"
              size={40}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

export default Searchbar

const styles = StyleSheet.create({
  input: {
    zIndex: 4,
    height: 40,
    backgroundColor: 'rgba(0,0,0,.5)',
    paddingHorizontal: '15%',
    marginHorizontal: '5%',
    color: colors.white,
    fontFamily: font.thin,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumRed
  },
  wrap: {
    paddingVertical: 10,
    zIndex: 3,
    position: 'relative',
  },
  iconLeft: {
    zIndex: 5,
    position: 'absolute',
    top: 7,
    padding: 10,
    left: '7%',
    backgroundColor: 'transparent',
  },
  iconRight: {
    zIndex: 5,
    position: 'absolute',
    top: 0,
    padding: 10,
    right: '7%',
    backgroundColor: 'transparent',
  },
})
