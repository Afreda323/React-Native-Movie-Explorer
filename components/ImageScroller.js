import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import Image from './Image'

import font from '../constants/fontFamily'
import colors from '../constants/colors'

class ImageScroller extends Component {
  static propsTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    recs: PropTypes.arrayOf(
      PropTypes.shape({
        poster_path: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }
  renderImages = () =>
    this.props.recs.map(movie => (
      <Image
        third
        horizontal
        key={movie.id}
        id={movie.id}
        imgPath={movie.poster_path}
        onClick={this.props.onPress}
      />
    ))
  render() {
    return (
      <View>
        {this.props.title && (
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={styles.title}>{this.props.title}</Text>
            <View
              style={{
                backgroundColor: colors.mediumRed,
                height: 2,
                width: 50,
                marginTop: 5,
                marginBottom: 8,
              }}
            />
          </View>
        )}
        <ScrollView horizontal>{this.renderImages()}</ScrollView>
      </View>
    )
  }
}

export default ImageScroller

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontFamily: font.regular,
    fontSize: 22,
    marginHorizontal: 20,
    marginTop: 8,
  },
})
